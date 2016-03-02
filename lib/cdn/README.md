# cdn 目录用途
放置第三方 CDN 服务的资源备份.

现在项目中常常使用免费的开源项目 CDN 服务(例如: [BootCDN](http://www.bootcdn.cn/)), 但是这些服务有可能抽搐(挂掉)一会, 因此在选择使用后**务必在自己的服务器上备份一份**(不要问我是怎么知道的), 以便免费的 CDN 服务挂掉时能够迅速切换过来.

```
//cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css
//r0.aaaaaaaa.com/lib/cdn/bootstrap/3.2.0/css/bootstrap.min.css
```

例如放置如下内容
```
cdn/
├── bootstrap/
├── font-awesome/
└── jquery/
```