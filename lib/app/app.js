(function($) {
    // zepto 没有 getScript 方法
    // jQuery.getScript
    $.getScript = function(url, callback) {
        return $.get(url, undefined, callback, 'script');
    };

    // 动态修改页面 title
    function setPageTitle($page) {
        var pageTitle = $page.data().pageTitle;
        if (pageTitle) {
            document.title = pageTitle;

            // 微信前端开发有哪些坑或者黑魔法？
            // https://www.zhihu.com/question/27849091/answer/38399344
            // 解决在 iOS 微信的 webview 中只能修改一次 document.title 的黑魔法
            // XXX 由于只会在 iOS 微信上遇到这个问题, 因此需要添加判断, 非微信就去掉这个黑魔法
            $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
                setTimeout(function() {
                    $(this).off('load').remove()
                }.bind(this), 0);
            }).appendTo(document.body);
        }
    }

    // 从一个页面准备开始加载，到执行完加载动画，会触发的事件
    // http://m.sui.taobao.org/components/#router
    $(document).on('pageInit', function(event, pageId, $page) {
        setPageTitle($page);
    });

    // 请确保在所有的 pageInit 事件绑定之后再调用 $.init() 方法。
    // http://m.sui.taobao.org/components/#init
    $.init();
})(Zepto);