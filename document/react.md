# React 项目快速搭建

## 使用create-react-app快速搭建
> **Node >= 6 和 npm >= 5.2**
> * npx create-react-app 项目名称

> * 运行 npm start

> * 打包 npm run build

> * 显示配置文件 npm run eject

## React v16.4 生命周期的理解

![Brief](../images/9.png)

> 我们将React的生命周期分为三个阶段:
>> * 挂载
>> * 更新
>> * 卸载

## 挂载

挂载阶段，也可以理解为组件的初始化阶段，就是将我们的组件插入到DOM中，只会发生一次

这个阶段的生命周期函数调用如下：

> * [constructor()](https://react.docschina.org/docs/react-component.html#constructor)
> * [static getDerivedStateFromProps()](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
> * [render()](https://react.docschina.org/docs/react-component.html#render)
> * [componentDidMount()](https://react.docschina.org/docs/react-component.html#componentdidmount)

### constructor

组件构造函数，第一个被执行

构造函数，和java class的构造函数一样，用于初始化这个组件的一些状态和操作，如果你是通过继承React.Component子类来创建React的组件的，那么你
应当首先调用super(props) 初始化父类

在构造函数里面我们一般会做两件事：

> * 初始化state对象
> * 给自定义方法绑定this

```
constructor(props) {
    super(props)
    
    this.state = {
      name:'source',
    }
    this.handleClick = this.handleClick.bind(this);
}

```
### 关于bind函数的解释说明

注意js的this指向比较特殊，比如以下的例子作为onClick回调函数由button组件去调用的时候不会把组件类的上下文带过去。

```
handleClick() {
    console.log('handleClick', this); // undefined
  }
 ...
 <button onClick={this.handleClick}>click</button>
```

这种问题推荐三种可能的解决方式，其核心均为将函数的this强制绑定到组件类上:

> * 就是上面说的在constructor函数中显示调用bind
> * 在onClick的时候进行bind: ，这种方式的劣势是每次调用的时候都需要进行bind，优势是方便传参，处理函数需要传参可以参考React的文档 [Passing Arguments to Event Handlers](https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers)
> * 声明函数时使用箭头匿名函数，箭头函数会自动设置this为当前类。(简洁有效，墙裂推荐)

```
handleClick = () => {
    console.log('handleClick', this); // Component
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
> **注意getDerivedStateFromProps是一个static方法，意味着拿不到实例的this**

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

componentDidMount方法会在render方法之后立即被调用，该方法在整个React生命周期中只会被调用一次。React的组件树是一个树形结构，此时你可以认为这个组件以及他下面的所有子组件都已经渲染完了，所以在这个方法中你可以调用和真实DOM相关的操作了

我们推荐可以在这个函数中发送异步请求，在回调函数中调用setState()设置state，等数据到达后触发重新渲染。但注意尽量不要在这个函数中直接调用setState()设置状态，这会触发一次额外的重新渲染，可能造成性能问题。

```
componentDidMount() {
    console.log('componentDidMount');
    fetch("https://api.github.com/search/repositories?q=language:java&sort=stars")
      .then(res => res.json())
      .then((result) => {
          this.setState({ // 触发render
            items: result.items
          });
        })
      .catch((error) => { console.log(error)});
    // this.setState({color: xxx}) // 不要这样做
  }
```

## 更新

更新阶段，当组件的props改变了，或组件内部调用了setState或者forceUpdate发生，会发生多次

这个阶段的生命周期函数调用如下：

>* [static getDerivedStateFromProps](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
>* [shouldComponentUpdate](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
>* [render](https://react.docschina.org/docs/react-component.html#render)
>* [getSnapshotBeforeUpdate](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
>* [componentDidUpdate](https://react.docschina.org/docs/react-component.html#componentdidupdate)

### getDerivedStateFromProps

这个方法在装载阶段已经讲过了，这里不再赘述，记住在更新阶段，无论我们接收到新的属性，调用了setState还是调用了forceUpdate，这个方法都会被调用

### shouldComponentUpdate

> `shouldComponentUpdate(nextProps, nextState)`

有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true

注意当我们调用forceUpdate并不会触发此方法

因为默认是返回true，也就是只要接收到新的属性和调用了setState都会触发重新的渲染，这会带来一定的性能问题，所以我们需要将this.props与nextProps以及this.state与nextState进行比较来决定是否返回false，来减少重新渲染

该函数通常是优化性能的紧急出口，是个大招，不要轻易用，如果要用可以参考Immutable 详解及 React 中实践 .

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

```
componentDidUpdate(prevProps) { 
  if(prevProps.myProps !== this.props.myProp) {
    // this.props.myProp has a different value
    // we can perform any operations that would 
    // need the new value and/or cause side-effects 
    // like AJAX calls with the new value - this.props.myProp
  }
}
```

## 卸载

卸载阶段，当我们的组件被卸载或者销毁了

这个阶段的生命周期函数只有一个：

> * [componentWillUnmount](https://react.docschina.org/docs/react-component.html#componentwillunmount)

### componentWillUnmount

当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

注意不要在这个函数里去调用setState，因为组件不会重新渲染了

## 错误处理

React16中新增了一个生命周期函数:

> * [static getDerivedStateFromError](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror)
> * [componentDidCatch](https://react.docschina.org/docs/react-component.html#componentdidcatch)

### componentDidCatch

在react组件中如果产生的错误没有被被捕获会被抛给上层组件，如果上层也不处理的话就会抛到顶层导致浏览器白屏错误，在React16中我们可以实现这个方法来捕获子组件产生的错误，然后在父组件中妥善处理，比如搞个弹层通知用户网页崩溃等

```
componentDidCatch(error, info) { // from react.org
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

```

## React.lazy

React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。

> `注意:React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库。它有一个很棒的服务端渲染打包指南。`

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}

```

## Suspense

如果在 MyComponent 渲染完成后，包含 OtherComponent 的模块还没有被加载完成，我们可以使用加载指示器为此组件做优雅降级。这里我们使用 Suspense 组件来解决。

```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}

```

## 创建 Refs

> * [Refs & DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)

Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。

```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

```
