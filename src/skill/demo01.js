/**
 * 1.确保数组值 数组初始化值
 * 使用 grid ，需要重新创建原始数据，并且每行的列长度可能不匹配，
 * 为了确保不匹配行之间的长度相等，可以使用Array.fill方法。
 */
{
    let array=Array(5).fill('');
    console.log(array);
}

/**
 * 2.获取数组唯一值 数组去重
 * 
 */
{
    const cars=['mazda','ford','renault','opel','mazda'];
    const uniqueWithArrayFrom=Array.from(new Set(cars));
    console.log(uniqueWithArrayFrom);
    const uniqueWithSpreadOperator =[...new Set(cars)];
    console.log(uniqueWithSpreadOperator);
}

/**
 * 3.使用展开运算符合并对象和对象数组
 * 扩展运算符合并对象
 */
{
    const person1={
        name:'李四',
        age:24,
        sex:'男'
    }
    const person2={
        name:'张三',
        age:30,
        work:'前端开发',
        like:'篮球'
    }
    const person={...person1,...person2};
    console.log(person);
    const cities = [
        { name: 'Paris', visited: 'no' },
        { name: 'Lyon', visited: 'no' },
        { name: 'Marseille', visited: 'yes' },
        { name: 'Rome', visited: 'yes' },
        { name: 'Milan', visited: 'no' },
        { name: 'Palermo', visited: 'yes' },
        { name: 'Genoa', visited: 'yes' },
        { name: 'Berlin', visited: 'no' },
        { name: 'Hamburg', visited: 'yes' },
        { name: 'New York', visited: 'yes' }
    ];
    const result=cities.reduce((accumulator,item,index,array)=>{
        return {
            ...accumulator,
            [item.name]:item.visited
        }
    },{});
    console.log(result);
}

/**
 * 4.Array.from 
 * 
 * Array.from 实现 map
 */

 {
    const cities = [
        { name: 'Paris', visited: 'no' },
        { name: 'Lyon', visited: 'no' },
        { name: 'Marseille', visited: 'yes' },
        { name: 'Rome', visited: 'yes' },
        { name: 'Milan', visited: 'no' },
        { name: 'Palermo', visited: 'yes' },
        { name: 'Genoa', visited: 'yes' },
        { name: 'Berlin', visited: 'no' },
        { name: 'Hamburg', visited: 'yes' },
        { name: 'New York', visited: 'yes' }
    ];
    
    const cityNames=Array.from(cities,({name})=>name);
    console.log(cityNames);
 }

 /**
  * 5.有条件的对象属性 根据条件给对象增加属性
  * 不再需要根据一个条件创建两个不同的对象，可以使用展开运算符号来处理。
  */
 {
     const getUser = (emailIncluded) => {
        return {
          name: 'John',
          surname: 'Doe',
          ...emailIncluded && { email : 'john@doe.com' }
        }
      }

      console.log(getUser(true));
      console.log(getUser(false));
 }
 {
    console.log(1);

    setTimeout(function(){
        console.log(2);
        process.nextTick(function(){
            console.log(3);
        });
        new Promise(function(resolve,reject){
            console.log(4);
            resolve();
        }).then(function(){
            console.log(5);
        });
    });

    process.nextTick(function(){
            console.log(6);
    });

    new Promise(function(resolve,reject){
        console.log(7);
        resolve();
    }).then(function(){
        console.log(8);
    });

    setTimeout(function(){
        console.log(9);
        process.nextTick(function(){
            console.log(10);
        });
        new Promise(function(resolve,reject){
            console.log(11);
        }).then(function(){
            console.log(12);
        });
    });
 }