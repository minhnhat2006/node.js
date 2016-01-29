var editor = null;
function beautyJS(text) {
    opts = {};
    opts.indent_size = 4;
    opts.indent_char = ' ';
    opts.preserve_newlines = true;
    opts.keep_array_indentation = false;
    opts.break_chained_methods = true;
    opts.indent_scripts = 'normal';
    opts.brace_style = 'collapse';
    opts.space_before_conditional = true;
    opts.unescape_strings = false;
    opts.wrap_line_length = 0;
    opts.space_after_anon_function = true;
    output = js_beautify(text, opts);
    editor.setValue(output);
    //$('#source').html(output);
}
var APIConsole = {
    imageFile: null,
    isRequesting: false,
    validAccessToken: function() {
        var accessToken = $.trim($('#accessToken').val());
        $('#accessToken').val(accessToken);
        if (accessToken.length === 0)
            return false;
        return true;
    },
    apiParams: function() {
        return {"token": $('#accessToken').val(),
            "profile": $('input:radio[name=optionsDevice]:checked').val(),
            "deviceid": $('#deviceId').val()};
    },
    addToHistory: function(response) {
        var method = $('#lblMethod').text();
        var historyLine = $('<div class="history-line"></div>');
        historyLine.append('<div class="history-url">' + method + ': ' + response.url + '</div>');
        if (method === 'POST')
            historyLine.append('<div class="history-data">DATA: ' + response.data + '</div>');
        historyLine.appendTo($('#apiHistory'));
    },
    validateActivityDetail: function() {
        var mediaId = $.trim($('#actDetailMediaId').val());
        if (mediaId.length === 0) {
            alert('Please input media id');
            $('#actDetailMediaId').focus();
            return false;
        }
        return true;
    },
    validateEmbrace: function() {
        var embraced_user = $.trim($('#actEmbracedUser').val());

        if (embraced_user.length === 0) {
            alert('Please input Embraced User');
            $('#actEmbracedUser').focus();
            return false;
        }

        return true;
    },
    validateUnembrace: function() {
        var embraced_user = $.trim($('#actUnembracedUser').val());

        if (embraced_user.length === 0) {
            alert('Please input Embraced User');
            $('#actUnembracedUser').focus();
            return false;
        }

        return true;
    },
    validateInspire: function() {
        var mediaId = $.trim($('#actInspireMediaId').val());
        if (mediaId.length === 0) {
            alert('Please input media id');
            $('#actInspireMediaId').focus();
            return false;
        }
        return true;
    },
    validateUninspire: function() {
        var mediaId = $.trim($('#actUninspireMediaId').val());
        if (mediaId.length === 0) {
            alert('Please input media id');
            $('#actUninspireMediaId').focus();
            return false;
        }
        return true;
    },
    validateComment: function() {
        var mediaId = $.trim($('#ctnCommentMediaId').val());
        if (mediaId.length === 0) {
            alert('Please input media id');
            $('#ctnCommentMediaId').focus();
            return false;
        }
        var comment = $.trim($('#ctnCommentContent').val());
        if (comment.length === 0) {
            alert('Please input your comment');
            $('#ctnCommentContent').focus();
            return false;
        }
        return true;
    },
    validateAlbumContent: function() {
        var albumId = $.trim($('#ctnAlbumId').val());
        if (albumId.length === 0) {
            alert('Please input album id');
            $('#ctnAlbumId').focus();
            return false;
        }
        return true;
    },
    validateRegister: function() {
        var email = $.trim($('#actRegisterEmail').val());
        if (email.length === 0) {
            alert('Please input Email address');
            $('#actRegisterEmail').focus();
            return false;
        }

        var password = $.trim($('#actRegisterPassword').val());
        if (password.length === 0) {
            alert('Please input Password');
            $('#actRegisterPassword').focus();
            return false;
        }

        return true;
    },
    validateUpload: function() {
        var albumId = $.trim($('#ctnUploadAlbumId').val());
        var media_type = $.trim($('#ctnUploadMediaType').val());
        if (albumId.length === 0) {
            alert('Please input album id');
            $('#ctnUploadAlbumId').focus();
            return false;
        }
        var title = $.trim($('#ctnUploadTitle').val());
        if (title.length === 0) {
            alert('Please input title');
            $('#ctnUploadTitle').focus();
            return false;
        }
        if (media_type === 'photo' || media_type === 'music') {
            if (APIConsole.imageFile === null) {
                alert('Please choose an image to upload.');
                return false;
            }
        }

        if (media_type === 'photo') {
            if (!(/\.(jpg|jpeg|gif|png|jpe)$/i).test(APIConsole.imageFile.name)) {
                alert('Please upload an image');
                return false;
            }
        } else if (media_type === 'music') {
            if (!(/\.(mp3|wav|ogg)$/i).test(APIConsole.imageFile.name)) {
                alert('Please upload an audio');
                return false;
            }
        } else {
            var importUrl = $.trim($('#ctnUploadUrl').val());
            if (importUrl.length === 0) {
                alert('Please input Import URL!');
                return false;
            }
        }

        return true;
    },
    makeAPICall: function() {
        // check user id
        var user = $.trim($('#user_id').val());
        if (user.length === 0) {
            alert('Please input user');
            $('#user_id').focus();
            return;
        }
        var data = $('#optCall').val().split('|');
        var action = data[1];
        var params = APIConsole.apiParams();
        params.apitype = action;
        params.api_method = data[0];
        params.user = $('#user_id').val();
        params.http_method = $('#lblMethod').text();

        var valid = false;
        switch (action) {
            case 'activities':
                valid = true;
                params.media_type = $('#actListMediaType').val();
                break;
            case '':
                if (APIConsole.validateActivityDetail()) {
                    valid = true;
                    params.media_type = $('#actDetailMediaType').val();
                    params.media_id = $('#actDetailMediaId').val();
                }
                break;
            case 'embrace':
                if (APIConsole.validateEmbrace()) {
                    valid = true;
                    params.embraced_user = $('#actEmbracedUser').val();
                }
                break;
            case 'unembrace':
                if (APIConsole.validateUnembrace()) {
                    valid = true;
                    params.embraced_user = $('#actUnembracedUser').val();
                }
                break;
            case 'inspire':
                if (APIConsole.validateInspire()) {
                    valid = true;
                    params.media_type = $('#actInspireMediaType').val();
                    params.media_id = $('#actInspireMediaId').val();
                }
                break;
            case 'uninspire':
                if (APIConsole.validateUninspire()) {
                    valid = true;
                    params.media_type = $('#actUninspireMediaType').val();
                    params.media_id = $('#actUninspireMediaId').val();
                }
                break;
            case 'comment':
                if (APIConsole.validateComment()) {
                    valid = true;
                    params.media_type = $('#ctnCommentMediaType').val();
                    params.media_id = $('#ctnCommentMediaId').val();
                    params.comment = $('#ctnCommentContent').val();
                }
                break;
            case 'album_list':
                params.media_type = $('#lstAlbumMediaType').val();
                valid = true;
                break;
            case 'album':
                if (APIConsole.validateAlbumContent()) {
                    valid = true;
                    params.album_id = $('#ctnAlbumId').val();
                    params.media_type = $('#ctnAlbumMediaType').val();
                }
                break;
            case 'register':
                if (APIConsole.validateRegister()) {
                    valid = true;
                    params.email = $('#actRegisterEmail').val();
                    params.password = $('#actRegisterPassword').val();
                }
                break;
            case 'upload':
                if (APIConsole.validateUpload()) {
                    valid = true;
                    params.media_type = $('#ctnUploadMediaType').val();
                    params.url = $('#ctnUploadUrl').val();
                }
                break;
        }
        if (valid) {
            APIConsole.isRequesting = true;

            if (action !== 'upload') {
                TC.callAPI(params, function(response) {
                    if (response.error === false) {
                        APIConsole.isRequesting = false;
                        if (typeof response.message === 'string')
                            response.message = $.parseJSON(response);
                        beautyJS(response.message.apiResponse);
                        APIConsole.addToHistory(response);
                    }
                });
            } else {
                if ((window.FileReader) && (window.FormData)) {
                    var apiParams = APIConsole.apiParams();
                    for (var attrname in apiParams) {
                        params[attrname] = apiParams[attrname];
                    }

                    var reader = new FileReader();
                    reader.onload = function(evt) {
                        //Because of how the file was read,
                        //evt.target.result contains the image in base64 format.
                        //Send the image via Socket.io
                        params.imgFile = evt.target.result;
                        params.imgFileName = APIConsole.imageFile.name;
                        params.imgFileSize = APIConsole.imageFile.size;
                        params.imgFileType = APIConsole.imageFile.type;
                        params.upload_type = params.media_type;
                        params.album_id = $('#ctnUploadAlbumId').val();
                        params.title = $('#ctnUploadTitle').val();
                        params.description = $('#ctnUploadDesc').val();
                        params.tags = new Array();

                        $('input[name^=tags]').each(function() {
                            var val = $(this).val();
                            if (val.length > 0)
                                params.tags.push(val);
                        });

                        TC.callAPI(params, function(response) {
                            if (response.error === false) {
                                APIConsole.isRequesting = false;
                                if (typeof response.message === 'string')
                                    response.message = $.parseJSON(response);
                                beautyJS(response.message.apiResponse);
                                APIConsole.addToHistory(response);
                            }
                        });
                    };
                    //And now, read the image and base64
                    reader.readAsDataURL(APIConsole.imageFile);
                } else {
                    alert('Your browser does not support ajax upload file.');
                }
            }
        }
    }
};

$(document).ready(function() {
    /**
     * Click on Get Access Token to get auth token
     * @argument {event} e Click event
     */
    $('#btnGetAccessToken').click(function(e) {
        e.preventDefault();
        var username = $.trim($("#user_name").val());
        var password = $.trim($("#password").val());
        var deviceId = $.trim($("#deviceId").val());

        TC.getAccessToken({username: username, password: password, deviceId: deviceId}, function(response) {
            if (response.error !== false) {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    $('#optCall').val('activity|activities|actList');
    $('#spanAPIName').text('/activity/?');
    $('#btnGetToken').click(function() {
        window.location = '/console/get-token';
    });
    $('#optCall').change(function() {
        var data = $(this).val().split('|');
        $('#spanAPIName').text('/' + data[0] + '/?');
        $('.input-panel').hide();
        $('#lblMethod').text(data[3]);
        if (data[2].length > 0) {
            $('#' + data[2]).show();
            $('#' + data[2]).find('input[type=text]').val('');
            $('#' + data[2]).find('textarea').val('');
            $('#photoUpload').val('');
            $('.tagedit-list').find('.tagedit-listelement-old').remove();
            APIConsole.imageFile = null;
        }
    });
    $('#makeAPICall').click(function() {
        $('#source').html('');
        //editor.setValue('');
        if (!APIConsole.validAccessToken()) {
            alert('Please get access token before making API call');
            return;
        }
        APIConsole.makeAPICall();
    });
    $('.nav-tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#btnChooseFile').click(function() {
        $('#photoUpload').trigger('click');
    });
    var uploadImage = document.getElementById("photoUpload");
    uploadImage.addEventListener("change", function(evt) {
        APIConsole.imageFile = this.files[0];
    });
    editor = CodeMirror.fromTextArea($('#source')[0], {
        theme: 'default',
        lineNumbers: true,
        mode: 'javascript',
        readOnly: true,
        value: ''
    });
    $('#ctnUploadTag').tagedit();
    $('#ctnUploadMediaType').change(function() {
        $('#ctnUploadV').css('display', $(this).val() === 'video' ? '' : 'none');
        $('#ctnUploadPM').css('display', $(this).val() === 'video' ? 'none' : '');
    });
});