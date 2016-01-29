$(document).ready(function() {
    /**
     * User's media items
     */
    $("#_select_all").prop("checked", false);

    /**
     * Checkbox select all
     * @argument {type} e description
     */
    $("#_select_all").change(function(e) {
        e.preventDefault();
        if (this.checked === true) {
            $(".chk_cls").prop('checked', true);
        } else {
            $(".chk_cls").prop('checked', false);
        }
    });

    /**
     * Update Blog data
     */
    $('#btnSave').click(function(e) {
        e.preventDefault();
        var comment = $.trim($("[name='comment']").val());

        TC.updateComment({media_id: $('#media_id').val(), media_type: $('#media_type').val(), comment_key: $('#key').val(), comment_msg: comment}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    // Delete one Comment
    $('.delete-comment').click(function(e) {
        e.preventDefault();
        var media_id = $(this).find("[name='media_id']").val();
        var media_type = $(this).find("[name='media_type']").val();
        var comment_key = $(this).find("[name='comment_key']").val();
        var name = $(this).parent().parent().find("td").eq(3).text();
        bootstrap_confirm('Delete confirm', "Are you sure want to delete comment '" + name + "'?", 'Cancel', 'OK', function() {
            TC.deleteComment({media_id: media_id, media_type: media_type, comment_key: comment_key}, null);
        });
    });
});