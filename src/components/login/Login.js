import React from 'react';
import axios from 'axios';
import http from '../../http/http';

import '../../assets/css/login.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display:'none',
            height:'36px',
            checkedLang:'简体中文',
            language:[
                '简体中文',
                'English',
                'Español'
            ],
            requestData:[]
        };
    }
    //鼠标移入显示语言
    handleEnter=()=>{
        this.setState({
            display:'block',
            height:'145px'  
        });
    }
    //鼠标移除隐藏语言
    handleLeave=()=>{
        var _display=this.state.display;
        if(_display=='block'){
            this.setState({
                display:'none',
                height:'36px'  
            });
        }    
    }
    //点击对应的语言
    handleLang=(key,event)=>{
        var text=event.target.innerHTML;
        this.setState({
            checkedLang:text
        });
        window.localStorage.setItem('languageIndex',key);
    }
    //数据请求
    listData=()=>{
        let url='Inveterapi/group';
        let param={
            MemberID: 'demo',
            inDate: '2018-11-15',
            inTime: '15:49:46'
          };
          http.axiosPost(url,param).then(result=>{
              console.log(result);//请求的数据
              //requesData定义好数据类型后本身的数据子集不能包含当前的数据类型
              this.setState({
                requestData:result.data[0].ChindGoodsID
              });
          },error=>{
              console.log(error);//请求错误的原因
          });
    }
    //生命周期函数dom已经挂在完成
    componentDidMount(){
        this.listData();
    }
    render() {
        let langIndex=window.localStorage.getItem('languageIndex');
        let langChecked=this.state.checkedLang;
        if(langIndex==0||langIndex==null){
            langChecked=langChecked;
        }else if(langIndex==1){
            langChecked='English';
        }else if(langIndex==2){
            langChecked='Español';
        }
        return (
          <div className="login-bg">
            <div className="login-language">
                <div className="checked-language" style={{height:this.state.height}} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
                    <span>{langChecked}</span>
                    <ul className="language-list" style={{display:this.state.display}}>
                        {this.state.language.map((value,key)=>{
                            return <li key={key} onClick={this.handleLang.bind(this,key)}>{value}</li>
                        })}
                    </ul>
                </div>
                <div>{this.state.requestData}</div>
            </div>
          </div>  
        );
    }
}

export default Login;