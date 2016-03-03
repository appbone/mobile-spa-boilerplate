(function($$, myApp, mainView) {
    function init(page) {
        $$('.card-case').on('click', function() {
            mainView.router.load({
                url: 'detail/detail.html'
            });
        });
    }

    myApp.onPageInit('profile', init);
})(Dom7, myApp, mainView);