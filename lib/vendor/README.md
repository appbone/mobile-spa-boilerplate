# vendor 目录用途
没有公共 CDN 托管的第三方库, 不限js, css, font, img等等第三方资源, 统统放这里.
注意不要直接修改第三方库(方便升级), 如果有特殊情况需要修改的, 必须移动到 app 目录.

例如放置如下内容
```
vendor/
├── flux.js
├── layer/
|   |── layer.png
│   └── layer.js
└── bootstrap-wysiwyg.js
```