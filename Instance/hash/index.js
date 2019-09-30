class HashRouters {
    constructor(){
        //存储hash与callback键值对
        this.routes={};
        //当前hash
        this.currentUrl='';
        //监听事件
        window.addEventListener('load',this.refresh,false);
        window.addEventListener('hashchange',this.refresh,false);
    }
    /**
     * 将path路径与对应的callback函数存储
     */
    route=(path,callback)=>{
        this.routes[path]=callback || function(){};
    }
    /**
     * 刷新
     */
    refresh=()=>{
        //获取当前URL中的hash路径
        this.currentUrl=location.hash.slice(1) || '/';
        //执行当前hash路径callback函数
        this.routes[this.currentUrl]();
    }
}

window.Router=new HashRouters();
var content=document.querySelector('body');
function changeBgColor(color){
    content.style.backgroundColor=color;
}

Router.route('/',function(){
    changeBgColor('yellow');
});

Router.route('/blue',function(){
    changeBgColor('blue');
});

Router.route('/green',function(){
    changeBgColor('green');
});
