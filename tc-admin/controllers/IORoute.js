var Crypto = require('crypto');
var _ = require("underscore");
var ConstantsRoute = require('./../lib/Constants-Route');
var ConstantsMessage = require('./../lib/Constants-Message');
var authModel = new (require('./../models/AuthModel'));
var approvalModel = new (require('./../models/ApprovalModel'));
var blogModel = new (require('./../models/BlogModel'));
var commentModel = new (require('./../models/CommentModel'));
var consoleModel = new (require('./../models/ConsoleModel'));
var flagQueueModel = new (require('./../models/FlagQueueModel'));
var staffPickModel = new (require('./../models/StaffPickModel'));
var graphBuilderModel = new (require('./../models/GraphBuilderModel'));
var massMailerModel = new (require('./../models/MassMailerModel'));
var userModel = new (require('./../models/UserModel'));
var viralModel = new (require('./../models/ViralModel'));
var statModel = new (require('./../models/StatsModel'));
var mediaModel = new (require('./../models/MediaModel'));
var collectionModel = new (require('./../models/CollectionModel'));
var notificationsModel = new (require('./../models/NotificationsModel'));
var flagMessageModel = new (require('./../models/FlagMessageModel'));
var gatheringManagerModel = new (require('./../models/GatheringManagerModel'));
var filterBuilderModel = new (require('./../models/FilterBuilderModel'));
var creativeMovementModel = new (require('./../models/CreativeMovementModel'));
var magazineModel = new (require('./../models/MagazineModel'));

exports.initRoutes = function(app) {
    /**
     * Get tcRestClient
     * @argument {request} req request
     */
    function getRestClient(req) {
        var tcRestClient = app.get('tcRestClient');

        if (req.session.user) {
            tcRestClient.setHeader('user', req.session.user);
        }
        if (req.session.token) {
            tcRestClient.setHeader('token', req.session.token);
        }
        if (req.session.sessionid) {
            tcRestClient.setHeader('Cookie', "__tcsess=" + req.session.sessionid);
        }

        return tcRestClient;
    }
    ;
    /**
     * Send flash message to client after loading page
     * @argument {request} req request
     * @argument {string} str flash message
     */
    function flashMessage(req, str) {
        req.session.flashmessage = str;
        req.session.save();
    }
    /**
     * Refresh page and send flash message
     * @argument {request} req request
     * @argument {string} str flash message
     */
    function refreshPage(req, str) {
        if (_.isString(str)) {
            flashMessage(req, str);
        }

        req.io.emit(ConstantsRoute.CLIENT_REFRESH);
    }
    /**
     * Redirect to another page and send flash message
     * @argument {request} req request
     * @argument {string} url url
     * @argument {string} str flash message
     */
    function redirect(req, url, str) {
        if (_.isString(str)) {
            flashMessage(req, str);
        }

        req.io.emit(ConstantsRoute.CLIENT_REDIRECT, {url: url});
    }

    /**
     * Authenticate for Login
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.LOGIN_AUTH, function(req) {
        authModel.setRestClient(getRestClient(req));

        authModel.authenticate(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.session.isLoggedIn = true;
                    req.session.user = res.user.user;
                    req.session.token = res.user.token;
                    req.session.userInfo = res.user;
                    req.session.save();
                    req.io.respond({'error': false});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Logout
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.LOGOUT, function(req) {
        console.log('User logout: ' + req.session.user);
        delete req.session.isLoggedIn;
        delete req.session.user;
        delete req.session.userInfo;
        delete req.session.token;
        delete req.session.sessionid;
        delete req.session.pageBreadcrumb;
        delete req.session.c_accessToken;
        delete req.session.c_deviceId;
        delete req.session.c_username;
        delete req.session.c_userid;
        req.session.save();
        req.io.respond({'error': false});
    });

    /**
     * Reset flash message content
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FLASH_MESSAGE_RESET, function(req) {
        delete req.session.flashmessage;
        req.session.save();
    });

    /**
     * Get current date
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COMMON_GET_DATE, function(req) {
        req.io.respond({'error': false, message: new Date().getTime()});
    });

    /**
     * Approve a waiting registration
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.APPROVAL_APPROVE, function(req) {
        approvalModel.setRestClient(getRestClient(req));

        approvalModel.approveRegistrations(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    if (_.has(req.data, 'refresh') && req.data.refresh === true) {
                        refreshPage(req, ConstantsMessage.AD0001);
                    } else {
                        req.io.respond({'error': false, message: ConstantsMessage.AD0001});
                    }
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get Mass Mailers list for a specified user
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_LIST_FOR_USER, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.getMassMailersListForUser(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Add user to one Mass Mailer
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_ADD_USER, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.addUserToMassMailer(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Remove user from one Mass Mailer
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_REMOVE_USER, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.removeUserFromMassMailer(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Add new Mass Mailers list
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_ADD, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.addMassMailer(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete Mass Mailers list
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_DELETE, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.deleteMassMailer(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    redirect(req, "/mass-mailer", res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Update Mass Mailers list
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_UPDATE, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.updateMassMailer(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Send message to all users in one Mass Mailer
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MASS_MAILER_SEND_MESSAGE, function(req) {
        massMailerModel.setRestClient(getRestClient(req));

        massMailerModel.sendMassMailerMessage(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });


    /**
     * Update Blog
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.BLOG_UPDATE, function(req) {
        blogModel.setRestClient(getRestClient(req));

        blogModel.updateBlog(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete Blog
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.BLOG_DELETE, function(req) {
        blogModel.setRestClient(getRestClient(req));

        blogModel.deleteBlog(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Update Comment
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COMMENT_UPDATE, function(req) {
        commentModel.setRestClient(getRestClient(req));

        commentModel.updateComment(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete Blog
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COMMENT_DELETE, function(req) {
        commentModel.setRestClient(getRestClient(req));

        commentModel.deleteComment(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Send warning email to media owner
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_GIVE_CREDIT_TALLCAT_MEDIA, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.giveCreditOnTallcatMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Send warning email to media owner
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_WARN_MEDIA, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.warnMediaToUser(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Flag user as s Tallcat Staff user
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_SET_FLAG, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.setFlag(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete one item in Flag Queue
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_DELETE_MEDIA, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.deleteMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get list of users
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_GET_LIST, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.getUsersList(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Update user's email/username
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_UPDATE, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.updateUser(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Update user's password
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_UPDATE_PASSWORD, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.updatePassword(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete Blog
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.USER_DELETE, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.deleteUser(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    app.io.route(ConstantsRoute.USER_LOCK, function(req) {
        userModel.setRestClient(getRestClient(req));
        userModel.lockUser(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                }
                else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * enable/disable create collections for user
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.CREATE_COLLECTION, function(req) {
        userModel.setRestClient(getRestClient(req));
        userModel.createCollection(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                }
                else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * get admin1 list
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.ADMIN1_LIST, function(req) {
        userModel.setRestClient(getRestClient(req));
        userModel.getAdmin1List(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                }
                else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * pick collections
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.PICK_COLLECTION, function(req) {
        collectionModel.setRestClient(getRestClient(req));
        collectionModel.pickCollection(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                }
                else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /** 
     * pick collections to trending
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.PICK_COLLECTION_TRENDING, function(req) {
        collectionModel.setRestClient(getRestClient(req));
        collectionModel.pickCollectionTrending(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                }
                else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * Unflag item from Flag Queue
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FLAG_QUEUE_UNFLAG_ITEM, function(req) {
        flagQueueModel.setRestClient(getRestClient(req));

        flagQueueModel.unflagItem(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Unflag item from Flag message
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FLAG_MESSAGE_UNFLAG_ITEM, function(req) {
        flagMessageModel.setRestClient(getRestClient(req));

        flagMessageModel.unflagMessage(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete one item in Flag Queue
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FLAG_QUEUE_DELETE_ITEM, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.deleteMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Set one item from Flag Queue as mature content
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FLAG_QUEUE_SET_MATURE, function(req) {
        flagQueueModel.setRestClient(getRestClient(req));

        flagQueueModel.setMature(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });


    /**
     * Unreport group from gathering reported
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GROUP_REPORT_UNREPORT_ITEM, function(req) {
        gatheringManagerModel.setRestClient(getRestClient(req));

        gatheringManagerModel.unreportGroup(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Send message to users owner group
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GROUP_MANAGER_SET_FEATURE, function(req) {
        gatheringManagerModel.setRestClient(getRestClient(req));

        gatheringManagerModel.setGatheringFeature(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * set base number of users
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GROUP_MANAGER_BASE_NUMBER_USERS, function(req) {
        gatheringManagerModel.setRestClient(getRestClient(req));

        gatheringManagerModel.setBaseNumberUsers(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Send message to users owner group
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GROUP_MANAGER_SEND_MESSAGE, function(req) {
        gatheringManagerModel.setRestClient(getRestClient(req));

        gatheringManagerModel.sendMessageToOwner(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * delete group from gathering reported
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GROUP_REPORT_DELETE_ITEM, function(req) {
        gatheringManagerModel.setRestClient(getRestClient(req));

        gatheringManagerModel.deleteGroup(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * set mature group
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GROUP_REPORT_SET_MATURE, function(req) {
        gatheringManagerModel.setRestClient(getRestClient(req));

        gatheringManagerModel.setMatureGroup(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * load more staffpick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_LOADMORE, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.loadmoreStaffPick(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * load more staffpick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.TRENDING_COLLECTION_LOADMORE, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.loadmoreTrendingCollectionItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * load more staffpick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_INSPIRED_LOADMORE, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));

        creativeMovementModel.loadmoreMovementInspiredItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * load more staffpick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_INSPIRED_GET_DELETED_ITEMS, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));

        creativeMovementModel.loadmoreMovementInspiredItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Un-remove media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_INSPIRED_RESTORE, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));
        console.log("routcre");
        creativeMovementModel.restoreMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * Remove item from Staff Pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_REMOVE, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.removeStaffPickMedias(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Un-remove media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_RESTORE_ITEMS, function(req) {
        staffPickModel.setRestClient(getRestClient(req));
        staffPickModel.restoreStaffpickItem(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Replace the media in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_REPLACE, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.replaceStaffPickMedias(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Replace the media in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_SHOW_NOW, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.showNowStaffPickMedias(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    app.io.route(ConstantsRoute.STAFF_PICK_DELETED_ITEMS, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.getStaffPickItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * update settings in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_UPDATE_SETTINGS, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.updateSettingsStaffPick(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * update settings in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.TRENDING_COLLECTION_UPDATE_SETTINGS, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.updateSettingsTrendingCollection(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * update settings in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STAFF_PICK_RESHOW, function(req) {
        staffPickModel.setRestClient(getRestClient(req));

        staffPickModel.reshowStaffPick(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * update settings in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_INSPIRED_RESHOW, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));

        creativeMovementModel.reshowMovement(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * update settings in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.TRENDING_COLLECTION_RESHOW, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.reshowTrending(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * Remove item from movement inspired
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_REMOVE_CONTENTS, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));

        creativeMovementModel.removeMovementInspiredMedias(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Remove item from movement inspired
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.TRENDING_COLLECTION_CONTENTS, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.removeTrendingCollectionMedias(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    if (typeof req.data.isRefreshPage !== 'undefined' && !req.data.isRefreshPage) {
                        req.io.respond({'error': false, message: res.message});
                    } else {
                        refreshPage(req, res.message);
                    }
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * show now movement inspired
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_INSPIRED_SHOW_NOW, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));

        creativeMovementModel.showNowMovementInspired(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * show now movement inspired
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.TRENDING_COLLECTION_SHOW_NOW, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.showNowTrendingCollection(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * update settings in the staff pick
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MOVEMENT_INSPIRED_UPDATE_SETTINGS, function(req) {
        creativeMovementModel.setRestClient(getRestClient(req));

        creativeMovementModel.updateMovementInspiredSettings(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Set viral for user
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.VIRAL_SET, function(req) {
        viralModel.setRestClient(getRestClient(req));

        viralModel.setViral(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Remove viral of user
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.VIRAL_REMOVE, function(req) {
        viralModel.setRestClient(getRestClient(req));

        viralModel.removeViral(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Sync user graph
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GRAPH_BUILDER_GET_EMBRACINGS, function(req) {
        userModel.setRestClient(getRestClient(req));

        userModel.getEmbracings(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    app.io.route(ConstantsRoute.CONTENT_UPLOADED_BY_DAY, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getContentUploadByday(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Sync user graph
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GRAPH_BUILDER_ADD_GRAPH, function(req) {
        graphBuilderModel.setRestClient(getRestClient(req));

        graphBuilderModel.addGraph(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Add Embracing relationship for users
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GRAPH_BUILDER_ADD, function(req) {
        graphBuilderModel.setRestClient(getRestClient(req));

        graphBuilderModel.addEmbrace(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Remove Embracing relationship of users
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.GRAPH_BUILDER_REMOVE, function(req) {
        graphBuilderModel.setRestClient(getRestClient(req));

        graphBuilderModel.removeEmbrace(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get access token for Rest Api
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.CONSOLE_GET_ACCESS_TOKEN, function(req) {
        consoleModel.setRestClient(getRestClient(req));

        consoleModel.getAccessToken(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.session.c_accessToken = res.accessToken;
                    req.session.c_deviceId = res.deviceId;
                    req.session.c_username = res.username;
                    req.session.c_userid = res.user;
                    req.session.save();
                    redirect(req, '/console', '');
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Call Rest API
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.CONSOLE_CALL_API, function(req) {
        consoleModel.setRestClient(getRestClient(req));

        consoleModel.callAPI(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete media
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.DELETE_MEDIA, function(req) {
        mediaModel.setRestClient(getRestClient(req));

        mediaModel.deleteMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * remove media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_REMOVE_MEDIA, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.removeMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    if (typeof req.data.isRefreshPage !== 'undefined' && !req.data.isRefreshPage) {
                        req.io.respond({'error': false, message: res.message});
                    } else {
                        refreshPage(req, res.message);
                    }
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * Un-remove media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_RESTORE_MEDIA, function(req) {
        collectionModel.setRestClient(getRestClient(req));
        collectionModel.restoreCollectionsItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * Permanently remove media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_PERMANENTLY_REMOVE_MEDIA, function(req) {
        collectionModel.setRestClient(getRestClient(req));
        collectionModel.permanentlyRemoveMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond({'error': false, message: res.message});
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });


    /**
     * remove media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_ADD_MEDIA, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.addMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Move order media from collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_MOVE_ORDER, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.moveOrder(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get items of a collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_GET_ITEMS, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.getCollectionItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get deleted items of a collection
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.COLLECTION_GET_DELETED_ITEMS, function(req) {
        collectionModel.setRestClient(getRestClient(req));

        collectionModel.getCollectionDeletedMediaItems(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily registration statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_REGISTRATIONS, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayRegistration(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily registration statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_REGISTRATIONS_BY_TYPE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayRegistrationByType(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily login statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_LOGIN, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayLogin(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily page view statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_PAGE_VIEW, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayPageView(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily embracing statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_EMBRACE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayEmbrace(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily inspiring statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_INSPIRE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayInspire(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily commenting statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_COMMENT, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayComment(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get daily content uploaded statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_CONTENT_UPLOADED, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalDayContentUploaded(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    /**
     * Get daily content uploaded statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.INSPIRE_MEDIA, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.inspireMedia(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }

        });
    });

    /**
     * Get monthly registration statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_REGISTRATIONS, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthRegistration(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get monthly registration statistic by type
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_REGISTRATIONS_BY_TYPE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthRegistrationByType(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get monthly login statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_LOGIN, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthLogin(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get monthly page view statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_PAGE_VIEW, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthPageView(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get monthly embracing statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_EMBRACE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthEmbrace(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get monthly inspiring statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_INSPIRE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthInspire(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get monthly commenting statistic
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_INTERVAL_MONTH_COMMENT, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getIntervalMonthComment(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get most viewed portals
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_MOST_VIEWED_PORTALS, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getMostViewedPortal(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get highest commented content
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_HIGHEST_COMMENTED_CONTENT, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getHighestCommentMediaContent(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get highest viewed content
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_HIGHEST_VIEWED_CONTENT, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getHighestViewMediaContent(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get highest inspired content
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_HIGHEST_INSPIRED_CONTENT, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getHighestInspireMediaContent(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get top 15 embracing
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_TOP_15_EMBRACING, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getTopEmbracing(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get top 15 embrace
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_TOP_15_EMBRACE, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getTopEmbrace(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get top 50 used tags
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_TOP_TAGS, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getTopUsedTags(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get top 50 creativ categories
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_TOP_CREATIV, function(req) {
        statModel.setRestClient(getRestClient(req));
        statModel.getTopCreativCategories(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Get beans_talkd tasks
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.STATS_GET_BEANSTALKD, function(req) {
        statModel.setRestClient(getRestClient(req));

        statModel.getBeanstalkdStat(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Add new Filter
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FILTER_BUILDER_ADD, function(req) {
        filterBuilderModel.setRestClient(getRestClient(req));

        filterBuilderModel.addFilter(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Update Filter
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FILTER_BUILDER_UPDATE, function(req) {
        filterBuilderModel.setRestClient(getRestClient(req));

        filterBuilderModel.updateFilter(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Delete Filter
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FILTER_BUILDER_DELETE, function(req) {
        filterBuilderModel.setRestClient(getRestClient(req));

        filterBuilderModel.deleteFilter(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    refreshPage(req, res.message);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Run Filter
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.FILTER_BUILDER_RUN, function(req) {
        filterBuilderModel.setRestClient(getRestClient(req));

        filterBuilderModel.runFilter(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });

    /**
     * Save magazine's cover.
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MAGAZINE_COVER_SAVE, function(req) {
        magazineModel.setRestClient(getRestClient(req));

        magazineModel.saveCover(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
    
    /**
     * Save magazine's cover.
     * @argument {Request} req Http request
     */
    app.io.route(ConstantsRoute.MAGAZINE_CONTENT_SAVE, function(req) {
        magazineModel.setRestClient(getRestClient(req));

        magazineModel.saveContent(req.data, function(res) {
            if (!res) {
                req.io.respond({'error': true, message: 'Internal server error'});
            } else {
                if (!res.error) {
                    req.io.respond(res);
                } else {
                    req.io.respond({'error': true, message: res.message});
                }
            }
        });
    });
};