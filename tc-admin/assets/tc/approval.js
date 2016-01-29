$(document).ready(function() {
    $("#_select_all").prop("checked", false);

    /**
     * Checkbox select all
     * @argument {type} e description
     */
    $("#_select_all").change(function(e) {
        e.preventDefault();
        if (this.checked === true) {
            $(".approve_chk_cls").prop('checked', true);
        } else {
            $(".approve_chk_cls").prop('checked', false);
        }
    });

    /**
     * Approve icon
     * @argument {type} e description
     */
    $(".aprove_a_cls").click(function(e) {
        e.preventDefault();
        var emails = new Array();
        var id = $(this).attr('aid');
        emails.push($("#email_" + id).val());

        TC.approveRegistration({email: emails}, function(res) {
            if (res.error === false) {
                bootstrap_alert('Success', res.message);
                $("#email_" + id).closest('tr').remove();
            } else {
                bootstrap_alert('Error', res.message);
            }
        });

        return false;
    });

    /**
     * Approve button
     * @argument {type} e description
     */
    $("#btn_approve").click(function(e) {
        e.preventDefault();
        var checkedBox = $("[class='approve_chk_cls']:checked");

        var emails = checkedBox.map(function(i, n) {
            return $(n).val();
        }).get();

        TC.approveRegistration({email: emails, refresh: true}, function(res) {
            if (res.error === false) {
                bootstrap_alert('Success', res.message);
                checkedBox.closest('tr').remove();
            } else {
                bootstrap_alert('Error', res.message);
            }
        });

        return false;
    });
});