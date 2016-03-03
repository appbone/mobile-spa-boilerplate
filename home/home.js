(function($$, myApp, mainView) {
    function initSlider() {
        var $page = $$(mainView.activePage.container);
        myApp.swiper($page.find('.swiper-container-home'), {
            pagination: $page.find('.swiper-container-home .swiper-pagination')
        });
    }
    function initAboutPopup() {
        $$('.js-popup-about').on('click', function() {
            var popupHTML = '<div class="popup">\
                                 <div class="navbar">\
                                     <div class="navbar-inner">\
                                         <div class="left"></div>\
                                         <div class="center">关于 Framework7</div>\
                                         <div class="right">\
                                             <a href="#" class="link close-popup">关闭</a>\
                                         </div>\
                                     </div>\
                                 </div>\
                                 <div class="content-block">\
                                    <p>Framework7 可以用来开发混合移动应用（原生和HTML混合）或者开发 iOS & Android 风格的 WEB APP。</p>\
                                 </div>\
                             </div>'
            myApp.popup(popupHTML);
        });
    }
    function initLogout() {
        $$('.text-logout').on('click', function() {
            myApp.confirm('确认注销吗?', function() {
                myApp.alert('确定');
            }, function() {
                myApp.alert('取消');
            });
        });
    }

    function init() {
        initSlider();
        initAboutPopup();
        initLogout();
    }

    // [Callbacks for Inital Pages](http://www.idangero.us/framework7/docs/page-callbacks.html#callbacks-for-inital-pages)
    // XXX 原来 index.html 就是 home.html 的内容, 因此需要在第一次初始化页面时手动触发 PageInit 回调
    // myApp.onPageInit('home', init).trigger();
    // 现在将 index.html 作为一个启动页面, 然后再路由到 home.html, 因此就不需要手动触发 PageInit 回调了
    // home 对应模版页面(home.html)中的 data-page="home"
    myApp.onPageInit('home', init);
})(Dom7, myApp, mainView); // 全局依赖