$(document).ready(function() {
    // get upload content per day
    $(".delete-media").bind('click', function(e) {
        var self = $(this);
        var mediaId = self.attr('media-id');
        var mediaType = self.attr('media-type');
        var ownerId = self.attr('owner-id');
        var mediaListId = [[0, 0, 0]];
        mediaListId[0][0] = mediaId;
        mediaListId[0][1] = mediaType;
        mediaListId[0][2] = ownerId;
        bootstrap_confirm('Delete confirm', 'Are you sure want to delete this media id "' + mediaId + '"?', 'Cancel', 'OK', 
            function() {
                TC.deleteMedia({list_media: JSON.stringify(mediaListId)}, function(response) {
                if (response.error === false) {
                    bootstrap_alert('Success', response.message);
                } else {
                    bootstrap_alert('Error', response.message);
                }
            });
        });        
    });
    $(".select-all").bind('change', function(e) {
        var self = $(this);
        if (self.is(':checked')) {
            $('.media-list .media-select').prop('checked', true);
        } else {
            $('.media-list .media-select').prop('checked', false);
        }
    });
    $(".delete-selected-item ").bind('click', function(e) {
        var listInput = $('.media-list .media-select:checked');
        var listMediaId = [];
        if (listInput && listInput.length > 0) {
            for (var i = 0; i < listInput.length; i++) {                
                item = $(listInput[i]);
                listMediaId[i] = new Array(3);
                listMediaId[i][0] = item.attr('media-id');
                listMediaId[i][1] = item.attr('media-type');
                listMediaId[i][2] = item.attr('owner-id');;
                
            };

            bootstrap_confirm('Delete confirm',
             'Are you sure want to delete these medias?', 'Cancel', 'OK', 
                function() {
                    TC.deleteMedia({list_media: JSON.stringify(listMediaId)}, 
                        function(response) {
                            if (response.error === false) {
                                bootstrap_alert('Success', response.message);
                            } else {
                                bootstrap_alert('Error', response.message);
                            }
                        });
            });            
        } else {
            bootstrap_alert('Error', "Select items to delete.");
        }
    });
    
});