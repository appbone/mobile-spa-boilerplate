# 网站项目目录结构规范

*v1.0.0 2016-3-2*

**基本原则**
1. 提取出公共模块以便重用, 公共模块分为项目中的公用(通用)模块(或组件)和第三方库(或组件)
2. 按照业务逻辑来划分模块, 即功能模块(可以理解为一个页面对应一个模块), 分而治之, 便于维护管理, 较大的模块可以酌情划分出子模块
3. 模块与模块之间尽可能保持独立, 互不依赖
4. 如果发现模块之间有(资源/逻辑)依赖, 酌情提取成公用模块

```
网站项目/          -- 项目名称
├── lib/           -- 公共模块
|   |── app/       -- 项目公用模块
|   |   └── res/   -- 项目公用资源
|   |── vendor/    -- 没有公共 CDN 托管的第三方库
|   └── cdn/       -- 公共 CDN 资源的备份
|
├── mod1/          -- 项目中的一个模块(例如用户资料模块)
|   |── mod1.html
|   |── mod1.css
|   |── mod1.js
|   └── res/       -- 该模块所用到的资源(图片, 音乐等等)
|       └── mod1.jpg
|
|── mod2/          -- 大模块可以酌情划分出子模块(或者只划分出独立页面)
|   |── mod2.1/    -- 子模块(组织方式与一般模块一致)
|   |── mod2.2/
|   |── mod2.css   -- 子模块的公共样式
|   |── mod2.js    -- 子模块的公共逻辑
|   └── res/       -- 子模块的公共资源
|       └── mod2.jpg
|
└── mod.../
```


**大模块拆分示例**
简单点的可以按照页面来拆分
```
user/
|── user.html
|── user-info.html
|── user-invite.html
|── user.css
|── user.js
└── res/
```

复杂点的建议按照子模块来拆分
```
user/
|── user.html
|── user.css
|── user.js
|── res/
|
|── user-info/
|   |── user-info.html
|   |── user-info.css
|   |── user-info.js
|   └── res/
|
└── user-invite/
    |── user-invite.html
    |── user-invite.css
    |── user-invite.js
    └── res/
```

## 参考
* [Baidu EFE team 项目目录结构规范](https://github.com/ecomfe/spec/blob/master/directory.md)