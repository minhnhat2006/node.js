$(document).ready(function() {
    /**
     * Logout button
     */
    $('#logout').click(function(e) {
        e.preventDefault();
        TC.logout();
    });
    /**
     * Flash message
     */
    if ($("#flashmessage").html() !== '') {
        bootstrap_alert('Informartion', $("#flascontainer").html());
        TC.resetFlashMessage();
    }

    $("#_" + $('#controller').val()).addClass('current');
    $('[data-toggle="confirmation"]').confirmation({
        'title': 'Are you sure?'
    });

    $(document).on('click', '[data-dismiss="confirmation"]', function() {
        $('[data-toggle="confirmation"]').confirmation('hide');
    });

    $('.search-box .search').on('click', function(e) {
        var searchCriteria = $('.search-box .search-criteria').val();
        var searchType = $('.search-box .search-type input[type="radio"]:checked').val();
        if (searchType == 'user') {
            window.location = '/user/?q=' + searchCriteria;
        } else if (searchType == 'blog') {
            window.location = '/blog/?q=' + searchCriteria;
        } else {
            window.location = '/media/?q=' + searchCriteria + '&media_type=' + searchType;
        };
    });
    $('.search-box .search-criteria').on('keypress', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) { //Enter keycode
            var searchCriteria = $('.search-box .search-criteria').val();
            if (searchCriteria) {
                var searchType = $('.search-box .search-type input[type="radio"]:checked').val();
                if (searchType == 'user') {
                    window.location = '/user?s_user=' + searchCriteria;
                } else if (searchType == 'blog') {
                    window.location = '/blog/?q=' + searchCriteria;
                } else {
                    window.location = '/media/?q=' + searchCriteria + '&media_type=' + searchType;
                };    
            }           
        }
    });
});