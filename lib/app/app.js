(function(global, Framework7, $$) {
    // 项目公共逻辑一般分为如下几个模块, 为方便简单使用, 我们将其挂在全局 window 下面
    // * 公共配置
    // * 工具方法
    // * 项目中公共出来的模块

    // global.myapp 中的"myapp"可以根据项目名称取一个更独特的名字
    var app = global.myapp = {};
    // 公共配置
    app.config = {
        cdnRoot: 'http://cdn.com',
        apiRoot: ''
    };
    // 工具方法
    app.util = {
        /**
         * 获取 URL querystring 中的参数值
         * 
         * @param name {string} 参数名
         * @param querystring {string} 提供要解析的 querystring, 没有提供则使用当前 URL 中的querystring
         * @return {string | object} 如果传入了参数名则获取指定的参数值, 否则返回一个包含了所有参数的对象
         */
        getQueryStringValue: function(name, querystring) {
            var querystring = querystring || location.search;
            var param = {};

            if (querystring) {
                querystring = querystring.replace(/^\?/, '');
                var kvs = querystring.split('&');

                kvs.reduce(function(previousValue, kv, index, array) {
                    var kvp = kv.split('=');
                    previousValue[kvp[0]] = decodeURIComponent(kvp[1]);

                    return previousValue;
                }, param);
            }

            if (name) {
                return param[name];
            } else {
                return param;
            }
        },
        /**
         * 根据浏览器的 User Agent 来设置不同的 class, 一般用于判断当前运行的环境来做特殊处理.
         * 例如在微信浏览器中要隐藏某个按钮, 在自己的 APP 中又要显示某个按钮, 或者执行特殊的逻辑.
         * 
         * @return {object} 各种浏览器的 boolean 判断
         */
        browser: (function() {
            var ua = window.navigator.userAgent;
            var browser = {};

            if (ua.match(/MicroMessenger/i)) {
                browser.wechat = true;
                document.documentElement.classList.add('in-wechat');
            } else if (ua.match(/MyAppUA/i)) {
                browser.myapp = true;
                document.documentElement.classList.add('in-app');
            } else {
                browser.mobile = true;
            }

            return browser;
        })()
    };
    // 项目中公共出来的模块
    app.wx = {
        /**
         * 在需要微信分享的页面调用这个方法来配置分享的信息
         * 
         * 配置分享信息的方式有两种
         * 1. 设计了一套分享的默认机制
         *    * 修改 document.title 为要分享 title
         *    * 修改 meta description 为要分享的 desc
         *    * 页面中 .share-placeholder-img 的图片为要分享的图片
         * 2. 通过传入 wxshareInfo 参数的方式
         */
        configWxshare: function(wxshareInfo) {
            // 你可以在这里实现微信分享功能
            // 主要是调用后端接口获取到微信分享的配置信息, 然后设置分享回调即可

            // 默认的分享图片
            var defaultImg = $('.share-placeholder-img').get(0);
            // 默认的分享信息
            var defaultShareInfo = {
                link: window.location.href.split('#')[0],
                title: document.title,
                desc: $('meta[name="description"]').attr('content'),
                imgUrl: defaultImg ? defaultImg.src : '',
                success: function() {
                    // 统计分享的情况
                },
                cancel: function() {
                    // 统计分享的情况
                }
            };

            var _wxshareInfo = $.extend({}, defaultShareInfo, wxshareInfo);

            // 推荐使用 backend-api 库来调用所有的后端接口, 这里只是示例, 代码执行是会出错的
            backendApi.invoke('getJssdk', {
                data: {
                    url: _wxshareInfo.link
                },
                success: function(result) {
                    wx.config({
                        debug: false,
                        appId: result.data.wxconfig.appId,
                        timestamp: result.data.wxconfig.timestamp,
                        nonceStr: result.data.wxconfig.nonceStr,
                        signature: result.data.wxconfig.signature,
                        jsApiList: [
                            // 所有要调用的 API 都要加到这个列表中
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'checkJsApi',
                            'openLocation',
                            'getLocation',
                            'hideMenuItems',
                            'previewImage'
                        ]
                    });

                    wx.ready(function () {
                        wx.onMenuShareTimeline(_wxshareInfo);
                        wx.onMenuShareAppMessage(_wxshareInfo);
                        wx.onMenuShareQQ(_wxshareInfo);
                        wx.onMenuShareWeibo(_wxshareInfo);
                    });
                }
            });
        }
    };
    // 加载底部导航, 不用每个页面都写死一个了, 要调整的时候就很麻烦
    app.loadFooterNavbar = function() {
        // 要页面选中某个 nav
        // 首先在页面中放置一个空的 <nav class="bar bar-tab bar-tab-brand">
        // 再设置 body 的属性 data-nav-item-id 与 navbarConfig 一致即可
        // 例如 <body data-nav-item-id="home">
        var navItemId = $(document.body).data('navItemId');

        // 推荐使用 art-template 模版引擎来拼装 HTML
        function render(navbarConfig, navItemId) {
            var html = '';
            for (var i = 0, length = navbarConfig.length; i < length; i++) {
                var item = navbarConfig[i];
                html += '<a class="tab-item" href="' + item.url + '">'
                html += '<span class="icon">';
                if (item.id == navItemId) {
                    html += '<img src="' + item.iconActive + '">'
                } else {
                    html += '<img src="' + item.icon + '">'
                }
                html += '</span>';
                html += '<span class="tab-label">' + item.name + '</span>';
                html += '</a>';
            }
            return html;
        }

        var navbarConfig = [{
            name: '首页',
            url: '/index.html',
            icon: 'http://placehold.it/25x25',
            iconActive: 'http://placehold.it/25x25/67c048',
            id: 'home'
        }, {
            name: '编辑',
            url: '/customize/customize.html',
            icon: 'http://placehold.it/25x25',
            iconActive: 'http://placehold.it/25x25/67c048',
            id: 'customize'
        }, {
            name: '我',
            url: '/profile/profile.html',
            icon: 'http://placehold.it/25x25',
            iconActive: 'http://placehold.it/25x25/67c048',
            id: 'profile'
        }];

        $('.bar-tab-brand').html(render(navbarConfig, navItemId));
    };
    app.myApp = new Framework7({
        pushState: true,
        animateNavBackIcon: true,
        scrollTopOnNavbarClick: true,
        scrollTopOnStatusbarClick: true,
        modalTitle: '',
        modalButtonOk: '确认',
        modalButtonCancel: '取消',
        onAjaxStart: function(xhr) {
            app.myApp.showIndicator();
        },
        onAjaxComplete: function(xhr) {
            app.myApp.hideIndicator();
        },
        preroute: function(view, options) {
            // if (!userLoggedIn) {
            //     view.router.loadPage('auth.html'); // load another page with auth form
            //     return false; // required to prevent default router action
            // }
        },
        preprocess: function (content, url, next) {
            // 可以尝试在这里做动态加载页面模块的 JS/CSS,
            // 由于 innerHTML 不会执行 <script> 标签的,
            // 因此可以考虑使用 jQuery 的 append 来加载 <script>,
            // 如果考虑要这样做, 就会需要面对在切换到其他页面时删除对应的
            // <script data-page="page"> 和 <link data-page="page">,
            // 而且这样分开加载, 页面渲染的速度上会受到影响, 因为要切换到一个页面, 还需要加载额外的资源,
            // 原来只需要 1 个请求(page.html), 现在拆成了 3 个(page.html, page.css, page.js)
            setPageTitle(content);
            return content;
        }
    });
    app.mainView = app.myApp.addView('.view-main', {
        dynamicNavbar: true
    });

    // 动态修改页面 title
    function setPageTitle(pageContent) {
        // 需要将 <title> 放置在模块模版文件中, 通过正则表达式提取出标题
        pageTitle = pageContent.match(/<title>(.+)<\/title>/);
        if (pageTitle) {
            document.title = pageTitle[1];

            // 微信前端开发有哪些坑或者黑魔法？
            // https://www.zhihu.com/question/27849091/answer/38399344
            // 解决在 iOS 微信的 webview 中只能修改一次 document.title 的黑魔法
            // XXX 由于只会在 iOS 微信上遇到这个问题, 因此需要添加判断
            $$('<iframe src="/favicon.ico"></iframe>').on('load', function() {
                setTimeout(function() {
                    $$(this).off('load').remove()
                }.bind(this), 0);
            }).appendTo(document.body);
        }
    }

    // 由于 framework7 监听了 tab-link 类型的链接, 默认只会执行 showTab 的逻辑, 不会做 ajax page 来切换页面
    // https://github.com/nolimits4web/Framework7/blob/master/src/js/clicks.js#isTabLink
    // 要绕过这个限制, 我们需要将 tab-link -> link, 他们在样式上是一致的,
    // 再在切换页面时选中对应的 link
    var $toolbar = $$('.toolbar');
    function activeToolbarLink(event) {
        var page = event.detail.page;

        // link class 的约定名: toolbarlink-{{page.name}}
        var toolbarLinkClass = '.toolbarlink-' + page.name;
        var $toolbarLink = $toolbar.find(toolbarLinkClass);
        if ($toolbarLink.length > 0) {
            $toolbar.find('.link').removeClass('active');
            $toolbarLink.addClass('active');
        }
    }
    // XXX 原来使用 pageInit 事件来同步 toolbar 的选中状态,
    // 但是发现用户使用浏览器回退按钮或者在手机上使用回退按钮时获得的 page.name 是 index 或者为 home,
    // 没有与当前渲染的页面对应上, 改用 pageBeforeAnimation 或者 pageAfterAnimation 事件后状态才是正常的
    $$(document).on('pageBeforeAnimation', activeToolbarLink);

    // XXX 原来 index.html 就是 home.html 的内容,
    // 但后来发现这样的架构存在一个比较严重的问题:
    // 如果用户在初始化页面后, 再点击一次首页按钮(就会切换到 #!/index.html),
    // 或者在切换到 #!/index.html 后刷新,
    // 此时当前页面的内容与切换的内容是完全一致的, 导致页面中出现重复 ID 的元素,
    // 这会造成 tab 等依赖 ID 来查找元素的组件无法正常运行(因为此时找到的元素都是上一个页面内容中的同 ID 元素),
    // 会出现例如点击 tab 后没有反应的问题.
    app.mainView.router.load({
        url: 'home/home.html',
        animatePages: false,
        pushState: false // 初始化加载首页时不记录浏览历史, 否则默认一打开首页时立刻回退就会回退到空白页面
    });
})(window, Framework7, Dom7); // 全局依赖

// 统计(例如百度统计)
var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "//hm.baidu.com/hm.js?你的统计ID";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);
})();