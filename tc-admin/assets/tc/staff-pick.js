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

    /** Flagged media section **/
    $(".media-thumb").each(function() {
        var img_element = $(this).find("img");
        var THIS = $(this);
        img = $("<img>");
        var imgW = 0;
        var imgH = 0;
        img.attr('src', img_element.attr("src"));
        img.load(function() {
            imgW = this.width;
            imgH = this.height;
            var size = CreativPortal.getImageSize(imgW, imgH, THIS.width(), THIS.height());
            img_element.css({width: size.width, height: size.height, maxWidth: 'none', marginLeft: size.left, marginTop: size.top});
        });
    });

    $('.staff_pick_remove').click(function(e) {
        e.preventDefault();

        var mediasList = $("[name='data[]']:checked").map(function(i, n) {
            return $(n).val();
        }).get();

        TC.removeStaffPick({'media_list[]': mediasList}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    $('.staff_pick_replace').click(function(e) {
        e.preventDefault();

        var mediasList = $("[name='data[]']:checked").map(function(i, n) {
            return $(n).val();
        }).get();

        TC.replaceStaffPick({'media_list[]': mediasList}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });


});