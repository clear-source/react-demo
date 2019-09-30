{
    function _new(){
        let target={};
        let [constructor,...args]=[...arguments];
        target.__proto__=constructor.prototype;
        let result=constructor.apply(target,args);
        if(result&&(typeof result==="object" || typeof result==="function")) return result;
        return target;
    }
    function Person(){
        this.name='tom'
    }

    let p=_new(Person);
    console.log(p);

}
{
    const isComplexDataType=obj=>
    (typeof obj === 'object' || typeof obj === 'function') && obj!==null;

    const selfNew=function(fn,...rest){
        let instance=Object.create(fn.prototype);
        let res=fn.apply(instance,rest);
        return isComplexDataType(res)?res:instance;
    }
    function Person(){
        this.name='tom'
    }
    let p=selfNew(Person)
    console.log(p.name);
}

{
    //深拷贝
    function clone(target){
        if(typeof target === 'object'){
            let cloneTarget=Array.isArray(target) ? [] :{};
            for(const key in target){
                cloneTarget[key]=clone(target[key]);
            }
            return cloneTarget;
        }else{
            return target;
        }
    }
    
}

{
    // let a=[1,2,3];
    // a.join=a.shift;
    const a={
        i:1,
        valueOf:function(){
            return this.i++;
        }
    }
    console.log(a);
    console.log(a == 1 && a == 2 && a == 3);
}
