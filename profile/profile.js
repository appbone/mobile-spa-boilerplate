(function($$, global) {
    function init(page) {
        $$('.card-case').on('click', function() {
            global.myapp.mainView.router.load({
                url: 'detail/detail.html'
            });
        });
    }

    global.myapp.myApp.onPageInit('profile', init);
})(Dom7, window);