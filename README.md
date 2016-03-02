# mobile-spa-boilerplate
Mobile Single Page App(SPA) Boilerplate, the easiest way to build a WebApp having a native look & feel and pages animation.

让你能够快速开发出一个体验起来很像客户端原生 App 的单页 WebApp.

## 使用这种架构的好处
**与其他单页 WebApp 的不同之处**
* 没有陡峭的学习曲线
    - 什么模块化, 什么 RequireJS, 什么 AMD/CMD, 统统走开
    - 什么 MVC, 什么 Backbone, 没有必要
    - 什么路由, 什么 hashchange, 不要来烦我
    - 什么模版, 什么表达式, 看着有点晕
    - 什么打包, 什么按需加载, 我真的只想做个页面
* 用多页面的开发模式实现单页面的酷炫效果
    - 只要做过网页的就能做出单页效果
    - 页面上的链接自动做页面切换效果

**再来说说好处**
* 提供了一套模仿原生 App 的 UI 组件(感谢 Framework7 框架)
* 提供了一套网站项目目录结构规范(即项目组织架构), 适用于任何网站, 不限于单页 WebApp
* 提供了一套开发规范(例如公共逻辑放哪里, 单页面逻辑放哪里, 样式放哪里)
* 解决了一般项目慢慢变大后会遇到的问题(例如按需加载)
* 解决了一些小坑(例如动态修改页面的 title)

## 架构的组成
**技术栈**
* [Framework7](http://framework7.io/)

  > 功能和动画都非常强大, 但对于 Android 的兼容性稍差, 特别是一些[组件的兼容性](https://github.com/sdc-fe/Framework7-Plus#compitable "Framework7 在安卓上的主要兼容性问题")
* [SUI Mobile](http://m.sui.taobao.org/ "出自阿里巴巴共享业务事业部UED团队")

  > 借鉴 Framework7, 基于 Zepto 比 Framework7 更轻量, 对 Android 的兼容性更好

## 适用范围
* Hybrid app
* 微信公众号页面
* Android 4.0+/iOS 6+