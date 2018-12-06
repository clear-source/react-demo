import React from 'react';
import PropTypes from "prop-types";
import http from '../../http/http';
import Prompt from '../prompt/Prompt';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
            requestData:[],
            userName:'',
            password:'',
            pwChecked:false
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
    
    //生命周期函数dom已经挂在完成
    componentDidMount(){
        
    }
    //获取用户名
    handleUserName=(e)=>{
        this.setState({
            userName:e.target.value
        });
    }
    //获取密码
    handlePassword=(e)=>{
        this.setState({
            password:e.target.value
        });
    }
    //获取是否记住密码
    handleCHangeChecked=(e)=>{
        let checkd=e.target.checked;
        if(checkd){
            this.setState({
                pwChecked:checkd
            });
        }else{
            this.setState({
                pwChecked:checkd
            });
        }
    }
    //登录提交
    handleSubmit=()=>{
        //判断用户名和输入框是否为空
        if(this.state.userName==''){
            Prompt('请输入用户名');
            return;
        }
        if(this.state.password==''){
            Prompt('请输入密码');
            return;
        }
        let params={
            MemberID:this.state.userName,
            PassWord:this.state.password
        }
        let url="login";
        let history = this.context.router.history;
        http.axiosPost(url,params).then(result=>{
            // console.log(result);//请求的数据
            if(result.data.status=="success"){
                localStorage.setItem("userId",result.data.level);
                localStorage.setItem("userName",this.state.userName);
                if(this.state.pwChecked) localStorage.setItem("pw",this.state.password);
                history.push('/main');
            }else if(result.data.status=="fail"){
                Prompt("用户名或密码错误");
            }
        },error=>{
            console.log(error);//请求错误的原因
        });
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
            </div>
            <div className="login-body">
                <h2 className="login-title">用户登录</h2>
                    <Input type="text" className="inputWidth"  fullWidth placeholder="请输入用户名" onInput={this.handleUserName}/>
                    <Input type="password" className="inputWidth m_t2"  fullWidth placeholder="请输入密码" onInput={this.handlePassword}/>
                <p className="pw-problem">
                    <FormControlLabel control={<Checkbox  checked={this.state.pwChecked} color="primary" onChange={this.handleCHangeChecked}/>} label="记住账号密码"/>
                    <Button color="primary" style={{"color":"#1976d2"}}>忘记密码</Button>
                </p>
                <Button color="primary" variant="contained" id="btn" onClick={this.handleSubmit}>登 录</Button>
            </div>
          </div>  
        );
    }
}


Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Login;