# React 项目快速搭建

## 使用create-react-app快速搭建
> * npx create-react-app 项目名称

> * 运行 npm start

> * 打包 npm run build

> * 显示配置文件 npm run eject

## React v16.4 生命周期的理解

![Brief](../images/9.png)

> React16废弃的三个生命周期函数
>> * ~~componentWillMount~~
>> * ~~componentWillReceiveProps~~
>> * ~~componentWillUpdate~~

> 取而代之的是两个新的生命周期函数
>> * static getDerivedStateFromProps
>> * getSnapshotBeforeUpdate

> 我们将React的生命周期分为三个阶段:
>> * 挂载阶段
>> * 更新阶段
>> * 卸载阶段

## 挂载阶段
==================================

挂载阶段，也可以理解为组件的初始化阶段，就是将我们的组件插入到DOM中，只会发生一次

这个阶段的生命周期函数调用如下：

> * constructor
> * getDerivedStateFromProps
> * ~~componentWillMount/UNSAVE_componentWillMount~~
> * render
> * componentDidMount

### constructor

组件构造函数，第一个被执行

如果没有显示定义它，我们会拥有一个默认的构造函数

如果显示定义了构造函数，我们必须在构造函数第一行执行super(props)，否则我们无法在构造函数里拿到this对象，这些都属于ES6的知识

在构造函数里面我们一般会做两件事：

> * 初始化state对象
> * 给自定义方法绑定this

```
constructor(props) {
    super(props)
    
    this.state = {
      name:'source',
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
}

```
> **禁止在构造函数中调用setState，可以直接给state设置初始值**

### getDerivedStateFromProps

> `static getDerivedStateFromProps(nextProps, prevState)`

当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps

```
class ExampleComponent extends React.Component {
  state = {
    isScrollingDown: false,
    lastRow: null
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentRow !== prevState.lastRow) {
        return {
            isScrollingDown:
            nextProps.currentRow > prevState.lastRow,
            lastRow: nextProps.currentRow
        }
    }
    return null
  }
}
```

### render

React中最核心的方法，一个组件中必须要有这个方法

返回的类型有以下几种：

> * 原生的DOM，如div
> * React组件
> * Fragment（片段）
> * Portals（插槽）
> * 字符串和数字，被渲染成text节点
> * Boolean和null，不会渲染任何东西

> `关于Fragment和Portals是React16新增的，如果大家不清楚可以去阅读官方文档，在这里就不展开了`

render函数是纯函数，里面只做一件事，就是返回需要渲染的东西，不应该包含其它的业务逻辑，如数据请求，对于这些业务逻辑请移到componentDidMount和componentDid Update中

### componentDidMount

组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

```
componentDidMount() {
    const { progressCanvas, progressSVG } = this

    const canvas = progressCanvas.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height

    const svg = progressSVG.current
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('x', 0)
    rect.setAttribute('y', 0)
    rect.setAttribute('width', 0)
    rect.setAttribute('height', svg.getBoundingClientRect().height)
    rect.setAttribute('style', 'fill:red')

    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    animate.setAttribute('attributeName', 'width')
    animate.setAttribute('from', 0)
    animate.setAttribute('to', svg.getBoundingClientRect().width)
    animate.setAttribute('begin', '0ms')
    animate.setAttribute('dur', '1684ms')
    animate.setAttribute('repeatCount', 'indefinite')
    animate.setAttribute('calcMode', 'linear')
    rect.appendChild(animate)
    svg.appendChild(rect)
    svg.pauseAnimations()

    this.canvas = canvas
    this.svg = svg
    this.ctx = ctx
 }
```

在componentDidMount中调用setState会触发一次额外的渲染，多调用了一次render函数，但是用户对此没有感知，因为它是在浏览器刷新屏幕前执行的，但是我们应该在开发中避免它，因为它会带来一定的性能问题，我们应该在constructor中初始化我们的state对象，而不应该在componentDidMount调用state方法

## 更新阶段
==================================

更新阶段，当组件的props改变了，或组件内部调用了setState或者forceUpdate发生，会发生多次

这个阶段的生命周期函数调用如下：

>* ~~componentWillReceiveProps/UNSAFE_componentWillReceiveProps~~
>* getDerivedStateFromProps
>* shouldComponentUpdate
>* ~~componentWillUpdate/UNSAFE_componentWillUpdate~~
>* render
>* getSnapshotBeforeUpdate
>* componentDidUpdate

### getDerivedStateFromProps

这个方法在装载阶段已经讲过了，这里不再赘述，记住在更新阶段，无论我们接收到新的属性，调用了setState还是调用了forceUpdate，这个方法都会被调用

### shouldComponentUpdate

> `shouldComponentUpdate(nextProps, nextState)`

有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true

注意当我们调用forceUpdate并不会触发此方法

因为默认是返回true，也就是只要接收到新的属性和调用了setState都会触发重新的渲染，这会带来一定的性能问题，所以我们需要将this.props与nextProps以及this.state与nextState进行比较来决定是否返回false，来减少重新渲染

### render

更新阶段也会触发，装载阶段已经讲过了，不再赘述

### getSnapshotBeforeUpdate

> `etSnapshotBeforeUpdate(prevProps, prevState)`

这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，请返回null，不写的话控制台会有警告

```
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

### componentDidUpdate

> `componentDidUpdate(prevProps, prevState, snapshot)`

该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的

在这个函数里我们可以操作DOM，和发起服务器请求，还可以setState，但是注意一定要用if语句控制，否则会导致无限循环

## 卸载阶段
==================================

卸载阶段，当我们的组件被卸载或者销毁了

这个阶段的生命周期函数只有一个：

> * componentWillUnmount

### componentWillUnmount

当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

注意不要在这个函数里去调用setState，因为组件不会重新渲染了
