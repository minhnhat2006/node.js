$(document).ready(function() {
    $('#d_massmailers').slimScroll({height: '550px', width: '100%'});
    $('#d_mm_users').slimScroll({height: '550px', width: '100%'});

    /**
     * Click button to input new Mass Mailer
     */
    $("#btn_add").click(function(e) {
        e.preventDefault();
        $('#new_mm_pop_up').bPopup();
        $('#mm_name').focus();
        return false;
    });

    /**
     * Click button to submit adding Mass Mailer
     */
    $('#add_new_mm').click(function(e) {
        e.preventDefault();
        var name = $.trim($("#mm_name").val());

        if (name === '') {
            alert("Mass Mailer list name cannot be empty");
            return;
        }

        TC.addMassMailer({name: $("#mm_name").val()}, function(response) {
            if (response.error === false) {
                $('#new_mm_pop_up').bPopup().close();
                $('#mm_name').val('');
                window.location = "/mass-mailer/index/id/" + response.mid;
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    /**
     * Edit Mass Mailer name
     */
    $("[class*='mm_edit']").bind('click', function(e) {
        e.preventDefault();
        var mmid = $(this).attr('class').substring(7);
        var name = $(this).parent().parent().find("td:first a").text();

        $('#mm_edit_id').val(mmid);
        $('#mm_edit_name').val(name);
        $('#edit_mm_pop_up').bPopup();
        $('#mm_edit_name').focus();

        return false;
    });

    /**
     * Update Mass Mailer name
     */
    $('#edit_mm').click(function(e) {
        e.preventDefault();
        var name = $.trim($("#mm_edit_name").val());

        if (name === '') {
            alert("Mass Mailer list name cannot be empty");
            return;
        }

        TC.updateMassMailer({name: $("#mm_edit_name").val(), mid: $('#mm_edit_id').val()}, function(response) {
            if (response.error === false) {
                $('#edit_mm_pop_up').bPopup().close();
                window.location = "/mass-mailer/index/id/" + response.mid;
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });


    /**
     * Delete Mass Mailer name
     */
    $("[class*='mm_delete']").click(function(e) {
        e.preventDefault();
        var mid = $(this).attr('class').substring(9);
        var name = $(this).parent().parent().find("td:first a").text();
        bootstrap_confirm('Delete confirm', 'Are you sure want to delete Mass Mailer list "' + name + '"?', 'Cancel', 'OK', function() {
            TC.deleteMassMailer({name: name, mid: mid}, null);
        });
    });

    /**
     * Compose Message to send to Mass Mailer list
     */
    $("[class*='mm_compose']").bind('click', function(e) {
        e.preventDefault();

        var userCount = parseInt($(this).parent().prev().text());

        if (userCount <= 0) {
            bootstrap_alert('Message Composer', "Please add user(s) to list");
            return;
        }

        var mmid = $(this).attr('class').substring(10);
        var name = "";
        if (mmid === '1') {
            name = $(this).parent().parent().find("td:first").text();
        } else {
            name = $(this).parent().parent().find("td:first a").text();
        }

        $('#mm_compose_id').val(mmid);
        $('#mm_compose_name').text(name);
        $('#compose_msg_pop_up').bPopup();
        $('#mm_compose_txt').focus();

        return false;
    });

    /**
     * Send message to Mass Mail list's users
     */
    $('#btn_send').click(function(e) {
        e.preventDefault();
        var msg = $.trim($("#mm_compose_txt").val());

        if (msg === '') {
            alert("Message cannot be empty");
            return;
        }

        TC.sendMassMailerMessage({msg: $("#mm_compose_txt").val(), name: $('#mm_compose_name').text(), mid: $('#mm_compose_id').val()}, function(response) {
            if (response.error === false) {
                $('#compose_msg_pop_up').bPopup().close();
                bootstrap_alert('Success', response.message);
                $('#mm_compose_txt').val("");
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });
});