(function($$, global) {
    function init(page) {
        var $page = $$(page.container);
        global.myapp.myApp.swiper($page.find('.swiper-container'), {
            pagination: $page.find('.swiper-pagination')
        });
    }

    global.myapp.myApp.onPageInit('customize', init);
})(Dom7, window);