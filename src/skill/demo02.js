{

/**
 * 构造函数创建对象
 */

function Person() {}
//ptototype函数的原型 继承属性
Person.prototype.name = "kevin";

var person1 = new Person();
var person2 = new Person(); 
console.log(person1.name);
console.log(person2.name);
//这是每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。
console.log(person1.__proto__===Person.prototype); //true

/*constructor 指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，
这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。*/
console.log(Person===Person.prototype.constructor); //true

// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person1)===Person.prototype); //true

}

{
    /**
     * 实例原型
     * 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，
     * 就去找原型的原型，一直找到最顶层为止。
     */

     function Person(){

     }

     //原型
     Person.prototype.name='kevin';

     //实例
     var person = new Person();

     person.name='tom';
     console.log(person.name);

     delete person.name;
     console.log(person.name);
}
{
   /*  var foo=function(){
        console.log('foo1');
    };
    foo(); //f001
    var foo=function(){
        console.log('f002');
    }
    foo(); //foo2
    */

    /* 声明提前
    function foo(){
        console.log('foo1');
    };
    foo(); //foo2
    function foo(){
        console.log('f002');
    }
    foo(); //foo2
    */
   
}

{
    /* 闭包 */
   /*  var arr=[];
    for(var i=0;i<3;i++){
        arr[i]=function(){
            console.log(i);
        }
    }
    arr[0](); //3
    arr[1](); //3
    arr[2](); //3 */

    var arr=[];
    for(var i=0;i<3;i++){
        (function(j){
            arr[j]=function(){
                console.log(j);
            }
        })(i);
    }
    arr[0](); //0
    arr[1](); //1
    arr[2](); //2
    console.log('------------------------');
}

{
    /* 深入之参数按值传递 */
    /* var obj={
        value:1,
    }
    function foo(o){
        o.value=2;
        console.log(o.value); //2
    }

    foo(obj);
    console.log(obj.value); //2
 */

    var obj={
        value:1,
    }
    function foo(o){
        o=2;
        console.log(o); //2
    }

    foo(obj);
    console.log(obj.value); //1
    console.log('----------------------')

}
{
    //call模拟实现
    Function.prototype.myCall=function(context){
        if (typeof this !== 'function') {
            throw new TypeError('not funciton')
          }
        var context=context||window;
        context.fn=this;

        var args=[];
        for(var i=1,len=arguments.length;i<len;i++){
            args.push('arguments['+i+']');
        }

        var result=eval('context.fn('+args+')');

        delete context.fn;

        return result;
    }

    var value=2;

    var foo={
        value:1,
    }
    function bar(name,age){
        console.log(name);
        console.log(age);
        console.log(this.value);
    }
    // bar.myCall(null);
    // bar.myCall(foo,'tom',28);
}

{
    // 实现一个apply函数
    Function.prototype.myApply=function(context){
        if(typeof this !== 'function'){
            throw new TypeError('not function');
        }
        context=context || window;
        context.fn=this;
        let result;
        if(arguments[i]){
            result=context.fn(...arguments[i]);
        }else{
            result=context.fn();
        }
        delete context.fn;
        return result;
    }

    
    var foo={
        value:10,
    }
    function bar(){
        console.log(this.value);
    }
    bar.myApply(foo,[1,2,3])

}
{
    //实现一个apply函数
    Function.prototype.myBind=function(context){
        if(typeof this !== 'function'){
            throw new TypeError('not function');
        }
        let _this=this;
        let arg={...arguments}.slice(1);
        return function F(){
            if(this instanceof F){
                return new _this(...arg,...arguments);
            }else{
                return _this.apply(context,arg.concat(...arguments));
            }
        }
    }


}