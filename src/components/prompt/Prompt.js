/**
 * 提示框
 * @param {*} content 提示内容
 */
export default  function Prompt(content){
        let div=document.createElement('div');
        let body=document.body;
        div.innerText=content;
        div.setAttribute("id","prompt");
        body.appendChild(div);
        let prompt=document.getElementById("prompt");
        setTimeout(()=>{
            body.removeChild(prompt);
        },2000);
    }

