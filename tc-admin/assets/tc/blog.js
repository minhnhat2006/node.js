$(document).ready(function() {
    /**
     * Update Blog data
     */
    $('#btnSave').click(function(e) {
        e.preventDefault();
        var title = $.trim($("#title-field").val());
        var content = CKEDITOR.instances.cntn_value.getData()

        if (title === '') {
            alert("Title cannot be empty");
            return;
        }

        TC.updateBlog({id: $("[name='blogpsid']").val(), title: title, content: content}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    /**
     * Delete Blog item
     */
    $(".deleteBlog").click(function(e) {
        e.preventDefault();
        var id = $(this).attr('alt');
        var name = $(this).parent().parent().find("td").eq(2).text();
        bootstrap_confirm('Delete confirm', 'Are you sure want to delete Blog "' + name + '"?', 'Cancel', 'OK', function() {
            TC.deleteBlog({id: id}, null);
        });
    });
});