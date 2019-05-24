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
