(function($$, myApp) {
    function init(page) {
        var $page = $$(page.container);
        myApp.swiper($page.find('.swiper-container'), {
            pagination: $page.find('.swiper-pagination')
        });
    }

    myApp.onPageInit('customize', init);
})(Dom7, myApp);