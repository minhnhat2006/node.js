$(document).ready(function() {
    // Click on Mass Mailer icon
    $("[class*='ad-massmailer']").bind('click', function(e) {
        e.preventDefault();
        var userid = $(this).attr('class').substring(13);
        var anc = $(this);

        TC.getMassMailersListForUser({user: userid}, function(response) {
            if (response.message !== null) {
                var inList = response.isin;
                var notinList = response.notin;
                $("#in_mm_list tbody tr").remove();
                $("#avail_mm_list tbody tr").remove();
                var inListTbl = $("#in_mm_list");
                var notinListTbl = $("#avail_mm_list");
                var trVal = "";

                for (var i = 0; i < inList.length; i++) {
                    if (inList[i].massmail_id === '1') {
                        trVal = "<tr><td></td><td>" + inList[i].name + "</td><td>" + inList[i].count + "</td></tr>";
                    } else {
                        trVal = "<tr><td><input type='checkbox' name='in_mm[]' value='" + inList[i].massmail_id + "'></td><td>" + inList[i].name + "</td><td>" + inList[i].count + "</td></tr>";
                    }
                    inListTbl.append($(trVal));
                }

                for (var i = 0; i < notinList.length; i++) {
                    trVal = "<tr><td><input type='checkbox' name='notin_mm[]' value='" + notinList[i].massmail_id + "'></td><td>" + notinList[i].name + "</td><td>" + notinList[i].count + "</td></tr>";
                    notinListTbl.append($(trVal));
                }

                $("#p_userid").val(userid);

                var closest_tr = anc.parent().parent();
                $("#p_username").text(closest_tr.find("td > div > p").text());
                $("#chk_notin_mm").prop("checked", false);
                $("#chk_in_mm").prop("checked", false);

                $('#element_to_pop_up').bPopup();

                var avail_mm_list = $("#avail_mm_list");
                if (avail_mm_list.height() < 220) {
                    $("#d_avail_mm_list").height(avail_mm_list.height());
                } else {
                    $("#d_avail_mm_list").height(220);
                }
                $("#d_avail_mm_list").parent().height($("#d_avail_mm_list").height());
                $('#d_avail_mm_list').slimScroll({scrollTo: '0px'});

                var in_mm_list = $("#in_mm_list");
                if (in_mm_list.height() < 220) {
                    $("#d_in_mm_list").parent().height(in_mm_list.height());
                } else {
                    $("#d_in_mm_list").parent().height(220);
                }
                $('#d_in_mm_list').slimScroll({scrollTo: '0px'});
            } else {
                bootstrap_alert('Error', "Error");
            }
        });
    });

    /**
     * Click on checkbox to select all Mass Mailers to remove
     */
    $("#chk_notin_mm").change(function() {
        var tbl = $("#avail_mm_list");
        if (this.checked) {
            tbl.find("input[type='checkbox']").prop("checked", true);
        } else {
            tbl.find("input[type='checkbox']").prop("checked", false);
        }
    });

    /**
     * Click to add user to Mass Mailer
     * @argument {event} e event
     */
    $("#add_mm").click(function(e) {
        e.preventDefault();
        var list = $("[name='notin_mm[]']:checked").map(function(i, n) {
            return $(n).val();
        }).get();

        if (list.length > 0) {
            TC.addUserToMassMailers({user: $("#p_userid").val(), 'mid[]': list}, function(response) {
                if (response.error === false) {
                    $('#element_to_pop_up').bPopup().close();
                    bootstrap_alert('Success', response.message);
                } else {
                    bootstrap_alert('Error', response.message);
                }
            });
        } else {
            alert("Please select any Mass Mailer lists to Add");
        }
    });

    /**
     * Click to remove user from Mass Mailer
     * @argument {event} e event
     */
    $("#remove_mm").click(function(e) {
        e.preventDefault();
        var list = $("[name='in_mm[]']:checked").map(function(i, n) {
            return $(n).val();
        }).get();

        if (list.length > 0) {
            TC.removeUserFromMassMailers({user: $("#p_userid").val(), 'mid[]': list}, function(response) {
                if (response.error === false) {
                    $('#element_to_pop_up').bPopup().close();
                    bootstrap_alert('Success', response.message);
                } else {
                    bootstrap_alert('Error', response.message);
                }
            });
        } else {
            alert("Please select any Mass Mailer lists to Remove");
        }
    });

    $('#d_avail_mm_list').slimScroll({height: '220px', width: '100%'});
    $('#d_in_mm_list').slimScroll({height: '220px', width: '100%'});

    /**
     * Click on checkbox to select all Mass Mailers to add
     */
    $("#chk_in_mm").change(function() {
        var tbl = $("#in_mm_list");
        if (this.checked) {
            tbl.find("input[type='checkbox']").prop("checked", true);
        } else {
            tbl.find("input[type='checkbox']").prop("checked", false);
        }
    });

    /**
     * User's media items
     */
    $("#_select_all").prop("checked", false);

    /**
     * Checkbox select all
     * @argument {type} e event
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
     * Update user data
     * @argument {type} e event
     */
    $('#btnUpdateUser').click(function(e) {
        e.preventDefault();
        var userId = $("[name='user']").val();
        var email = $("[name='user_email']").val();
        var username = $("[name='username']").val();

        if (email === '') {
            alert("Email cannot be empty");
            return;
        }

        if (username === '') {
            alert("Url/Username cannot be empty");
            return;
        }

        TC.updateUser({user: userId, username: username, user_email: email}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    /**
     * Update user data
     * @argument {type} e event
     */
    $('#btnUpdatePassword').click(function(e) {
        e.preventDefault();
        var userId = $("[name='user']").val();
        var newPassword = $("[name='new_password']").val();
        var confirmPassword = $("[name='confirm_password']").val();

        if (newPassword === '') {
            alert("New Password cannot be empty");
            return;
        }

        if (confirmPassword === '') {
            alert("Confirm Password cannot be empty");
            return;
        }

        TC.updatePassword({user: userId, new_password: newPassword, confirm_password: confirmPassword}, function(response) {
            if (response.error === false) {
                bootstrap_alert('Success', response.message);
            } else {
                bootstrap_alert('Error', response.message);
            }
        });
    });

    /**
     * Click to delete a user account
     * @argument {type} e event
     */
    $('.delete-user').click(function(e) {
        e.preventDefault();
        var user = $(this).attr('alt');
        bootstrap_confirm('Delete confirm', 'Are you sure want to delete this user?', 'Cancel', 'OK', function() {
            TC.deleteUser({user: user}, null);
        });
    });

    /**
     * Click to delete a user account
     * @argument {event} e event
     */
    $('.flag-user').click(function(e) {
        e.preventDefault();
        var user = $(this).attr('alt');
        var flag = $(this).attr('flag');
        TC.setUserFlag({user: user, flag: (flag == 0 ? 1 : 0)}, null);
    });

    /**
     * Click to warn a media to owner
     * @argument {type} e event
     */
    $('.warn-media').click(function(e) {
        e.preventDefault();
        var mediaId = $(this).attr('mediaId');
        var mediaType = $(this).attr('mediaType');
        bootstrap_confirm('Delete confirm', 'Are you sure want to warn this media to user?', 'Cancel', 'OK', function() {
            TC.warnMediaToUser({media_id: mediaId, media_type: mediaType}, function(response) {
                if (response.error === false) {
                    bootstrap_alert('Success', response.message);
                } else {
                    bootstrap_alert('Error', response.message);
                }
            });
        });
    });

    /**
     * Click to delete a user account
     * @argument {type} e event
     */
    $('.delete-media').click(function(e) {
        e.preventDefault();
        var mediaId = $(this).attr('mediaId');
        var mediaType = $(this).attr('mediaType');
        bootstrap_confirm('Delete confirm', 'Are you sure want to delete this media?', 'Cancel', 'OK', function() {
            TC.deleteUserMedia({media_id: mediaId, media_type: mediaType}, function(response) {
                if (response.error === false) {
                    bootstrap_alert('Success', response.message);
                } else {
                    bootstrap_alert('Error', response.message);
                }
            });
        });
    });

    // suspend user
    $('.suspend-user').click(function(e) {
        e.preventDefault();
        var user = $(this).attr('alt');
        var THIS = $(this);
        var msg = '';
        if ($(this).hasClass('un-lock')) {
            msg = 'Are you sure want to lock this user ?';
        } else {
            msg = 'Are you sure want to un-lock this user ?';
        }

        bootstrap_confirm('Lock confirm', msg, 'Cancel', 'OK', function() {
            if (THIS.hasClass('un-lock')) {
                TC.lockUser({user: user, lock: 1}, function(response) {
                    if (response.error === false) {
                        THIS.removeClass('un-lock');
                        THIS.addClass('lock');
                        bootstrap_alert('Success', response.message);
                    } else {
                        bootstrap_alert('Error', response.message);
                    }
                });
            } else {
                TC.lockUser({user: user, lock: 0}, function(response) {
                    if (response.error === false) {
                        THIS.removeClass('lock');
                        THIS.addClass('un-lock');
                        bootstrap_alert('Success', response.message);
                    } else {
                        bootstrap_alert('Error', response.message);
                    }
                });
            }
        });
    });

    // suspend user
    $('.collection-user').click(function(e) {
        console.log('dasdsad');
        e.preventDefault();
        var user = $(this).attr('alt');
        var THIS = $(this);
        var msg = '';
        if ($(this).hasClass('disable')) {
            msg = 'Are you sure want to enable collection creator ?';
        } else {
            msg = 'Are you sure want to disable collection creator ?';
        }

        bootstrap_confirm('collection creator confirm', msg, 'Cancel', 'OK', function() {
            if (THIS.hasClass('disable')) {
                TC.createCollectionUser({user: user, enable: 1}, function(response) {
                    if (response.error === false) {
                        THIS.removeClass('disable');
                        THIS.addClass('enable');
                        bootstrap_alert('Success', response.message);
                    } else {
                        bootstrap_alert('Error', response.message);
                    }
                });
            } else {
                TC.createCollectionUser({user: user, enable: 0}, function(response) {
                    if (response.error === false) {
                        THIS.removeClass('enable');
                        THIS.addClass('disable');
                        bootstrap_alert('Success', response.message);
                    } else {
                        bootstrap_alert('Error', response.message);
                    }
                });
            }
        });
    });
});