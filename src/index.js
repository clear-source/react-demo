import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,HashRouter,Switch } from "react-router-dom";//路由跳转

//优化打包后路由不同读取不同js文件 动态加载
import asyncComponent from './untils/asyncComponent';
const App =asyncComponent(()=> import ('./App'));
const Main = asyncComponent(()=> import ('./components/main/Main'));

//引入全局样式
import 'normalize.css';
import './assets/css/rest.css';
import './rem/rem.js';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    (<HashRouter>
        <div className="box">
            <Route exact path="/" component={App}/>
            <Route path="/main" component={Main}/>
        </div>
    </HashRouter>), 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
