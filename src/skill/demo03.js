
{
    //js 驼峰转换下划线
    function toLine(name){
        return name.replace(/([A-Z])/g,"_$1").toLowerCase();
    }
    let s='contentType';
    console.log(toLine(s)); //content_type

}

{
    //下划线转驼峰
    function toHump(name){
        return name.replace(/\_(\w)/g,function(all,letter){
            // console.log(all,letter);
            return letter.toUpperCase();
        });
    }
    console.log(toHump('content_type')) //contentType
}

{
    //数组扁平化
    let arr=[1, 2, [3, 4], 5, 6, [7, 8], 9] ;
    const flatten=function(arr){
        //判断item是否数组
        while(arr.some(item=>Array.isArray(item))){
            arr=[].concat(...arr);
        }
        return arr;
    }
    console.log(flatten(arr));
}


