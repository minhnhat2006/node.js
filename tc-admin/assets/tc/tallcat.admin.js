
$(document).ready(function() {

    $('#content-tag').click(function() {
        window.location = '/staff-pick/index/t/t';
    });

    $('#content-category').click(function() {
        window.location = '/staff-pick/index/t/c';
    });

    // checkbox on manager media item
    $("#_select_all").click(function() {
        if ($(this).attr('checked')) {
            $("._checkbox").attr('checked', true);
        } else {
            $("._checkbox").attr('checked', false);
        }
    });

    $("#_select_all_button").click(function() {
        $("._checkbox").attr('checked', true);
        $("#_select_all").attr('checked', true);
    });

    // Validate login form
    $('#admin_login_form').validate({
        rules: {
            username: {
                maxlength: 30,
                required: true
            },
            password: {
                minlength: 3,
                required: true
            }
        },
        highlight: function(label) {
            $(label).closest('.control-group').addClass('error');
        },
        success: function(label) {
            label
                    .text('OK!').addClass('valid')
                    .closest('.control-group').addClass('success');
        }
    });

    $('#upload_date').datepicker();

    $('#search-date').click(function(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        var params = {from: $('#date-from').val(), to: $('#date-to').val()};
        $.ajax('/statistic/page-view', {type: 'POST',
            data: params,
            success: function(response) {
                if (response.result) {
                    $('#page-view-result span').html(response.val);
                } else {
                    bootstrap_alert('Error', response.message);
                }
            },
            error: function(error) {
                bootstrap_alert('Error', error);
            }
        });
    });

    $('.datepicker').datepicker();
});
