$(document).ready(function() {
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

    /**
     * Unflag media item
     */
    $('.unflag-media').click(function(e) {
        e.preventDefault();

        var mediaId = $(this).parent().parent().find("td").eq(0).text();
        var mediaType = $(this).parent().find(".mediaType").val();

        TC.unflagMedia({media_id: mediaId, media_type: mediaType}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    /**
     * Mark/Un-mark media as mature content
     */
    $('.mark-mature-media').click(function(e) {
        e.preventDefault();

        var mediaId = $(this).parent().parent().find("td").eq(0).text();
        var mediaType = $(this).parent().find(".mediaType").val();
        var mature = $(this).attr('mature');

        TC.setMediaMature({media_id: mediaId, media_type: mediaType, mark_mature: (mature === '0' ? '1' : '0')}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    /**
     * Delete one media item
     */
    $('.delete-flagged-media').click(function(e) {
        e.preventDefault();
        var mediaId = $(this).parent().parent().find("td").eq(0).text();
        bootstrap_confirm('Delete confirm', 'Are you sure want to delete this media?', 'Cancel', 'OK', function() {
            TC.deleteFlagQueueMedia({id: mediaId}, null);
        });
    });
});