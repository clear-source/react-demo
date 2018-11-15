import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//引入全局样式
import 'normalize.css';
import './assets/css/rest.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
