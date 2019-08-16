# React项目中的细节问题

## 后台管理系统左侧菜单栏选中子菜单后刷新后还在当前菜单栏

    1.通过存储来获取当前选中的子菜单
    2.通过地址栏window.location.href路由改变

## 配置路由时导入组件 
    ()=>import (url)

## React项目性能优化

> * 使用[React.PureComponent](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent)写组件
> * 使用shouldComponentUpdate手工优化渲染 [Immutable.js](https://github.com/immutable-js/immutable-js)
> * 不要直接改变 [setState](https://zh-hans.reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data) 数据
> * 渲染列表使用key属性,key唯一性
> * 使用无状态组件

### 使用无状态组件

```
const status=()=>{
    return <div>......</div>
}

```

### 动态加载路由 

> * 减少打包后首页出现加载所有页面的js文件
> * 根据不同的路由加载不同的js文件
> * 优化首页加载速度

```
import React, { Component } from "react";

/**
 * 动态加载打包后路由不同的js文件 高阶组件
 * @param {*} importComponent 
 */
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }
    componentDidMount() {
      importComponent().then(mod => {
        this.setState({
          component: mod.default
        });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
  return AsyncComponent;
}

```

    引入路由js文件方式

```

//优化打包后路由不同读取不同js文件 动态加载
import asyncComponent from './untils/asyncComponent';
const App =asyncComponent(()=> import ('./App'));
const Main = asyncComponent(()=> import ('./components/main/Main'));

<Switch>
    <Route exact path="/" component={App}/>
    <Route path="/main" component={Main}/>
</Switch>

```

请求读取对象报错
默认 msg:''

{msg.data} //报错
{msg && msg.data} 可以

