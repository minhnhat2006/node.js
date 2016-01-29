$(document).ready(function() {
    /**
     * Click on Viral star icon
     */
    $('a.viral-action').click(function(e) {
        e.preventDefault();

        var userId = $(this).attr('alt');
        var isVip = $(this).hasClass('vip');

        if (isVip) {
            bootstrap_confirm('Confirm', "Do you want to remove this user from VIP group (viral>75%)?", 'Cancel', 'OK', function() {
                TC.removeViral({user: userId}, function(response) {
                    if (response.error === false) {
                        bootstrap_alert('Success', response.message);
                    } else {
                        bootstrap_alert('Error', response.message);
                    }
                });
            });
        } else {
            bootstrap_confirm('Confirm', "Do you want to set this user to VIP group (viral>75%)?", 'Cancel', 'OK', function() {
                TC.setViral({user: userId}, function(response) {
                    if (response.error === false) {
                        bootstrap_alert('Success', response.message);
                    } else {
                        bootstrap_alert('Error', response.message);
                    }
                });
            });
        }
    });
});