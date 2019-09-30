const obj={};
const input=document.getElementById('input');

Object.defineProperty(obj,'text',{
    get:function(){
        console.log('get val')
    },
    set:function(newVal){
        console.log('set val'+newVal);
        input.value=newVal;
        document.getElementById('text').innerHTML=newVal;
    }
});

input.addEventListener('input',function(e){
    e.preventDefault();
    obj.text=e.target.value;
});