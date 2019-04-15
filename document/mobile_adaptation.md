# web 移动端开发技巧

## 一、meta 的使用

<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
设置Web应用是否以全屏模式运行
<meta name="apple-mobile-web-app-capable" content="yes">
顶部状态栏背景色
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
设置缓存
<meta http-equiv="Cache-Control" content="no-cache" />
QQ浏览器私有
全屏模式

<meta name="x5-fullscreen" content="true">
强制竖屏

<meta name="x5-orientation" content="portrait">
强制横屏

<meta name="x5-orientation" content="landscape">
应用模式

<meta name="x5-page-mode" content="app">

UC浏览器私有
全屏模式

<meta name="full-screen" content="yes">
强制竖屏

<meta name="screen-orientation" content="portrait">
强制横屏

<meta name="screen-orientation" content="landscape">
应用模式

<meta name="browsermode" content="application">
不让 Android 手机识别邮箱
<meta content="email=no" name="format-detection" />
禁止 iOS 识别长串数字为电话
<meta content="telephone=no" name="format-detection" />
百度禁止转码 通过百度手机打开网页时，百度可能会对你的网页进行转码，往你页面贴上它的广告，非常之恶心。不过我们可以通过这个meta标签来禁止它：
<meta http-equiv="Cache-Control" content="no-siteapp" />

## 二、文本的处理

1、关闭iOS键盘首字母自动大写
<input type="text" autocapitalize="off" />
2、多行文本溢出

```
    .xx{
    　　display:-webkit-box !importmort;
    　　overflow:hidden;
    　　text-overflow:ellipsis;
    　　word-break:break-all;
    　　-webkit-box-orient:vertical;
    　　-webkit-line-clamp:2;(数字2表示隐藏两行)
    }
```
3、禁止文本缩放

```
*{
-webkit-text-size-adjust:100%;
}
```
4、上下拉动滚动条时卡顿、慢

```
    body {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    }
```
5、禁止复制、选中文本

```
Element {
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
```
6、长时间按住页面出现闪退

```
element {
    -webkit-touch-callout: none;
}
```
7、顶部状态栏背景色

```
Element {
    -webkit-tap-highlight-color:rgba(255,255,255,0)
}
```
8、js报错原因
```
    * {
        touch-action: pan-y;
    }
```
9、禁止 iOS 弹出各种操作窗口
-webkit-touch-callout:none
8、消除 transition 闪屏
-webkit-transform-style: preserve-3d;     /*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-backface-visibility: hidden;      /*(设置进行转换的元素的背面在面对用户时是否可见：隐藏)*/


