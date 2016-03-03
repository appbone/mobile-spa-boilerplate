// 暴露全局变量
var myApp;
var mainView;

(function(global, Framework7, $$) {
    myApp = new Framework7({
        pushState: true,
        animateNavBackIcon: true,
        scrollTopOnNavbarClick: true,
        scrollTopOnStatusbarClick: true,
        modalTitle: '',
        modalButtonOk: '确认',
        modalButtonCancel: '取消',
        onAjaxStart: function(xhr) {
            myApp.showIndicator();
        },
        onAjaxComplete: function(xhr) {
            myApp.hideIndicator();
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

    mainView = myApp.addView('.view-main', {
        dynamicNavbar: true
    });

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
    mainView.router.load({
        url: 'home/home.html',
        animatePages: false,
        pushState: false // 初始化加载首页时不记录浏览历史, 否则默认一打开首页时立刻回退就会回退到空白页面
    });

    // 暴露全局变量
    // global.myApp = myApp;
})(window, Framework7, Dom7); // 全局依赖