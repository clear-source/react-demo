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