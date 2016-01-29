$(document).ready(function() {
    var socket = io.connect();
    $('#username').focus();

    $("#btn_signin").click(function(e) {
        if (socket) {
            TC.showWatingPopup();
            socket.emit('authenticate', {username: $("#username").val(), password: $("#password").val()}
            , function(data) {
                if (data.error === false) {
                    window.location = "/";
                } else {
                    $("#message").html(data.message);
                    $("#msg_warning").css('display', '');
                }
            });
        }

        return false;
    });
});