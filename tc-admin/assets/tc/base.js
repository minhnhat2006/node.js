/**
 * TLocal, for l18n
 * @since Sith
 * @type TLocal
 * @author P This comment just for test
 */
if (!window.btoa)
    window.btoa = $.base64.btoa;
if (!window.atob)
    window.atob = $.base64.atob;
$.base64.utf8encode = true;
var TLocal = {
    /*P: data for translation */
    _translateData: {},
    /*
     * P: Translate function
     * Use TLocal.t('index')
     * index is defined in /statics/pw/language/<EN>.js
     * With value:
     * Use TLocal.t('message_contain_value_index', ["This", "is", "some value"]);
     * @return string, null if index is not defined
     * 
     * To use with plural/singular:
     * TLocal.translate("<singular_index>|<plural_index>", value);
     */
    translate: function(index, vals) {
        if (typeof index !== "string") {
            return index;
        }
        if (index.indexOf('|') > -1) {
            messages = index.split("|");
            if (vals > 1) {
                return TLocal.translate(messages[1], vals);
            } else {
                return TLocal.translate(messages[0], vals);
            }
        } else {
            try {
                message = this._translateData[index] ? this._translateData[index] : index;
            } catch (err) {
                if (TConst.get('application_env') == 'development') {

                }
                message = index;
            }
            if (vals !== undefined) {
                if (typeof vals == 'object') {
                    for (val in vals) {
                        message = message.replace(/\%v/g, vals[val]);
                    }
                } else {
                    message = message.replace(/\%v/g, vals);
                }
            }
            return message;
        }
    },
    /*P: Update current translate data */
    updateTranslate: function(data) {
        for (index in data) {
            this._translateData[index] = data[index];
        }
    },
    /*P: Set data for TLocal::translate*/
    setTranslateData: function(data) {
        this._translateData = data;
    }
};

/**
 * TConst
 * @since Hermes
 * @type TLocal
 * @author P
 */
TConst = {
    _data: {
        /*Define default data here*/
    },
    data: function(opts) {
        if (opts == undefined) {
            return this._data;
        }
        var cst = $.base64.atob(opts, true);
        if (typeof cst !== 'object') {
            cst = $.parseJSON(cst);
        }
        if (typeof cst == 'object') {
            this._data = $.extend({}, this._data, cst);
        }
    },
    get: function(index) {
        try {
            value = this._data[index];
        } catch (Err) {
            value = null;
        }
        return value;
    },
};

var TC = {
    socket: undefined,
    /**
     * Check whether socket is opened
     * @returns {Boolean}
     */
    isSocketOpen: function() {
        return TC.socket !== undefined;
    },
    /**
     * Establish socket connection
     * @returns {Boolean}
     */
    openSocket: function() {
        if (TC.socket !== undefined) {
            return false;
        }

        TC.socket = io.connect('', {
            'resource': 'socket.io',
            'connect timeout': 10000,
            'try multiple transports': true,
            'reconnect': true,
            'reconnection delay': 500,
            'reconnection limit': Infinity,
            'max reconnection attempts': 10,
            'sync disconnect on unload': false,
            'auto connect': true,
            'flash policy port': 10843,
            'force new connection': true
        });

        /**
         * Register events for socket.io
         */
        TC.socket.on('connect', function() {
            /**
             * Refresh current page
             */
            TC.socket.on('refresh', function() {
                window.location.reload();
            });
            /**
             * Redirect to another page
             */
            TC.socket.on('redirect', function(data) {
                window.location.href = data.url;
            });
        });
    },
    /*
     * Reset flash message
     */
    resetFlashMessage: function() {
        if (TC.isSocketOpen()) {
            TC.socket.emit('flashmessage_reset');
        }
    },
    /**
     * Show popup waiting
     */
    showWatingPopup: function() {
        $('#waitingPopup').bPopup();
    },
    /**
     * Hide popup waiting
     */
    hideWatingPopup: function() {
        $('#waitingPopup').bPopup().close();
    },
    /**
     * Emit a socket event
     * @param {type} eventName
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    emitSocket: function(eventName, data, callback) {
        if (TC.isSocketOpen()) {
            TC.showWatingPopup();
            TC.socket.emit(eventName, data, function(response) {
                TC.hideWatingPopup();
                callback(response);
            });
            return true;
        } else {
            return false;
        }
    },
    /**
     * Logout
     * @returns {undefined}
     */
    logout: function() {
        if (TC.isSocketOpen()) {
            TC.showWatingPopup();
            TC.socket.emit('logout', {}, function(data) {
                if (data.error === false) {
                    window.location = "/login";
                }
            });
        }
    },
    /**
     * Approve a pending registrations list
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    approveRegistration: function(data, callback) {
        TC.emitSocket('a_approve', data, callback);
    },
    /**
     * Give Credit on Tallcat's Media to user
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    giveCreditOnTallcatMedia: function(data, callback) {
        TC.emitSocket('user_givecreditmedia', data, callback);
    },
    /**
     * Send warning email to media owner
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    warnMediaToUser: function(data, callback) {
        TC.emitSocket('user_warn', data, callback);
    },
    /**
     * Flag user as s Tallcat Staff user
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    setUserFlag: function(data, callback) {
        TC.emitSocket('user_flag', data, callback);
    },
    /**
     * Delete media items
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteUserMedia: function(data, callback) {
        TC.emitSocket('user_delmedia', data, callback);
    },
    /**
     * Get list of users
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    getUserList: function(data, callback) {
        TC.emitSocket('user_list', data, callback);
    },
    /**
     * Update user's email/subpath
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    updateUser: function(data, callback) {
        TC.emitSocket('user_update', data, callback);
    },
    /**
     * Update user's password
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    updatePassword: function(data, callback) {
        TC.emitSocket('user_changepass', data, callback);
    },
    /**
     * Delete a user
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteUser: function(data, callback) {
        TC.emitSocket('user_delete', data, callback);
    },
    /**
     * suspend user
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    lockUser: function(data, callback) {
        TC.emitSocket('user_lock', data, callback);
    },
    /**
     * create collections
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    createCollectionUser: function(data, callback) {
        TC.emitSocket('create_collection', data, callback);
    },
    /**
     * Get Mass Mailers list for specified user
     * @param {Object} data
     * @param {type} callback
     * @returns {undefined}
     */
    getMassMailersListForUser: function(data, callback) {
        TC.emitSocket('mm_list_for_user', data, callback);
    },
    /**
     * Add a user to Mass Mailers list
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    addUserToMassMailers: function(data, callback) {
        TC.emitSocket('mm_add_user', data, callback);
    },
    /**
     * Remove a user from Mass Mailers list
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    removeUserFromMassMailers: function(data, callback) {
        TC.emitSocket('mm_remove_user', data, callback);
    },
    /**
     * Add new Mass Mailer
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    addMassMailer: function(data, callback) {
        TC.emitSocket('mm_add', data, callback);
    },
    /**
     * Delete Mass Mailer
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteMassMailer: function(data, callback) {
        TC.emitSocket('mm_delete', data, callback);
    },
    /**
     * Update Mass Mailer name
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    updateMassMailer: function(data, callback) {
        TC.emitSocket('mm_update', data, callback);
    },
    /**
     * Send a message to all users of one Mass Mailer
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    sendMassMailerMessage: function(data, callback) {
        TC.emitSocket('mm_send_msg', data, callback);
    },
    /**
     * Update Blog data
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    updateBlog: function(data, callback) {
        TC.emitSocket('blog_update', data, callback);
    },
    /**
     * Delete selected Blog
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteBlog: function(data, callback) {
        TC.emitSocket('blog_delete', data, callback);
    },
    /**
     * Update one Comment
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    updateComment: function(data, callback) {
        TC.emitSocket('comment_update', data, callback);
    },
    /**
     * Delete selected Comment
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteComment: function(data, callback) {
        TC.emitSocket('comment_delete', data, callback);
    },
    /**
     * Unflag one media item
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    unflagMedia: function(data, callback) {
        TC.emitSocket('fq_unflag', data, callback);
    },
    /**
     * Set one media as mature content
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    setMediaMature: function(data, callback) {
        TC.emitSocket('fq_setmature', data, callback);
    },
    /**
     * Delete one media in Flag Queue
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteFlagQueueMedia: function(data, callback) {
        TC.emitSocket('fq_delete', data, callback);
    },
    /**
     * Click to Remove Staff Pick
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    removeStaffPick: function(data, callback) {
        TC.emitSocket('stp_remove', data, callback);
    },
    /**
     * Click to Replace Staff Pick
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    replaceStaffPick: function(data, callback) {
        TC.emitSocket('stp_replace', data, callback);
    },
    /**
     * Set viral for user
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    setViral: function(data, callback) {
        TC.emitSocket('viral_set', data, callback);
    },
    /**
     * Remove viral of user
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    removeViral: function(data, callback) {
        TC.emitSocket('viral_remove', data, callback);
    },
    /**
     * Sync user graph
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    addGraph: function(data, callback) {
        TC.emitSocket('grapbld_addgraph', data, callback);
    },
    /**
     * Sync user graph
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    getEmbracings: function(data, callback) {
        TC.emitSocket('grapbld_getembracings', data, callback);
    },
    /**
     * Add Embracing relationship for users
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    addEmbrace: function(data, callback) {
        TC.emitSocket('grapbld_add', data, callback);
    },
    /**
     * Remove Embracing relationship of users
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    removeEmbrace: function(data, callback) {
        TC.emitSocket('grapbld_remove', data, callback);
    },
    /**
     * Get data content upoad by day
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    contentUploadByDay: function(data, callback) {
        TC.emitSocket('content_upload_by_day', data, callback);
    },
    /**
     * Get access token for Rest Api
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    getAccessToken: function(data, callback) {
        TC.emitSocket('csl_getaccesstoken', data, callback);
    },
    /**
     * Call Rest API
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    callAPI: function(data, callback) {
        TC.emitSocket('csl_callapi', data, callback);
    },
    /**
     * Delete media
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    deleteMedia: function(data, callback) {
        TC.emitSocket('delete_media', data, callback);
    }
};

var TCUtils = {
    /**
     * Upcase first letter
     * @argument {String} string String
     */
    capitaliseFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**
     * Generate user view from user data
     * @argument {User} userData user data
     */
    genUserViewFromUserData: function(userData) {
        var html = "<div style='width: 80px;height:80px;float:left'><a href='" + userData.portal + "'><img src='" + userData.avatar + "' alt='avatar' /></a>" +
                "</div><div style='float:left;margin-left: 10px;padding-top: 10px; max-width: 140px;overflow:hidden'><p style='margin:0'>" + TCUtils.capitaliseFirstLetter(userData.name) +
                "</p><small>" + userData.email + "</small></br><small>" + userData.creativ + "</small></div>";
        return html;
    }
};

$(document).ready(function() {
    TC.openSocket();
});