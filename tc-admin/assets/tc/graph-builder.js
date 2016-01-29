$(document).ready(function() {
    /**
     * Click to sync user graph
     */
    $("._a_sync").click(function(e) {
        e.preventDefault();
        var userId = $(this).attr('aid');

        TC.addGraph({user: userId}, function(response) {
            if (response.error === false) {
                $('#link_' + userId).remove();
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });
    /**
     * Click to Embrace
     */
    $("#embrace_btn").click(function(e) {
        e.preventDefault();
        var from = $("#from").val();
        var to = $("#to").val();

        if (from === 'A') {
            bootstrap_alert('Error', "Please select user From");
            return;
        }

        if (to === 'A') {
            bootstrap_alert('Error', "Please select user To");
            return;
        }

        TC.addEmbrace({from: from, to: to}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });
    /**
     * Click to remove Embrace
     */
    $("#remove_embrace_btn").click(function(e) {
        e.preventDefault();
        var from = $("#from").val();
        var to = $("#to").val();

        if (from === 'A') {
            bootstrap_alert('Error', "Please select user From");
            return;
        }

        if (to === 'A') {
            bootstrap_alert('Error', "Please select user To");
            return;
        }

        TC.removeEmbrace({from: from, to: to}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });
});