import '/bootstrap.min.js'

(function($) {

    let win = $(window);
    let w = win.width();

    let body = $('body');
    let btn = $('#sidebarToggle');
    let btnClose = $('#sidebarCloseToggle');
    let btnClose1 = $('#sidebarToggleHolder');
    let sidebar = $('.sidebar');

    console.log('running');


    // Collapse on load

    if (win.width() < 992) {
        sidebar.addClass('collapsed');
    }

    sidebar.removeClass('mobile-hid');

    // Events

    btn.click(toggleSidebar);
    btnClose.click(toggleSidebar);
    btnClose1.click(toggleSidebar);

    console.log('running click toggleBar');

    win.resize(function() {

        if (w==win.width()) {
            return;
        }

        w = win.width();

        if (w < 992 && !sidebar.hasClass('collapsed')) {
            toggleSidebar();
        } else if (w > 992 && sidebar.hasClass('collapsed')) {
            toggleSidebar();
        }
    });

    function toggleSidebar() {

        console.log('running toggleSidebar');

        if (win.width() < 992 || !sidebar.hasClass('collapsed')) {
            body.animate({'padding-left':'0'},100);
        }
        else if (win.width() > 992 && sidebar.hasClass('collapsed')) {
            body.animate({'padding-left':'14rem'},100);
        }

        if (!sidebar.hasClass('collapsed')) {
            sidebar.fadeOut(100,function(){
                btn.hide();
                sidebar.addClass('collapsed');
                btn.fadeIn(100);
            });
        }
        else {
            sidebar.removeClass('collapsed');
            sidebar.fadeIn(100);
        }

    }
})(jQuery)