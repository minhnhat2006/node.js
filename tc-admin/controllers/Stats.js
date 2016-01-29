var _ = require("underscore");
var QueryString = require('querystring');
var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var statModel = new (require('./../models/StatsModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "stats",
    nameContentUpload: 'content-upload-by-day',
    nameMostViewedPortal: 'most-viewed-portal',
    nameTopEmbracing: 'top-embracing',
    nameTopEmbrace: 'top-embrace',
    nameTopTag: 'top-tag',
    nameTopCreativCatg: 'top-creativ-categories',
    nameHighestViewMedia: 'highest-view-media',
    nameHighestCommentMedia: 'highest-comment-media',
    nameHighestInspireMedia: 'highest-inspire-media',
    nameBeansTalkd: 'beanstalkd',
    nameBeansTalkdFailed: 'beanstalkd-failed',
    nameRegistration: 'registration',
    nameRegistrationHour: 'registration-hour',
    init: function() {
        statModel.setRestClient(this.getRestClient());
        this.setModel(statModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameContentUpload) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameContentUpload));
        } else if (this.originalActionName === this.nameMostViewedPortal) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameMostViewedPortal));
        } else if (this.originalActionName === this.nameTopEmbracing) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameTopEmbracing));
        } else if (this.originalActionName === this.nameTopEmbrace) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameTopEmbrace));
        } else if (this.originalActionName === this.nameTopTag) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameTopTag));
        } else if (this.originalActionName === this.nameHighestViewMedia) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameHighestViewMedia));
        } else if (this.originalActionName === this.nameHighestCommentMedia) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameHighestCommentMedia));
        } else if (this.originalActionName === this.nameHighestInspireMedia) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameHighestInspireMedia));
        } else if (this.originalActionName === this.nameBeansTalkd) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameBeansTalkd));
        } else if (this.originalActionName === this.nameBeansTalkdFailed) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameBeansTalkdFailed));
        } else if (this.originalActionName === this.nameRegistration) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameRegistration));
        } else if (this.originalActionName === this.nameRegistrationHour) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameRegistrationHour));
        } else if (this.originalActionName === this.nameTopCreativCatg) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameTopCreativCatg));
        }
    },
    /**
     * Load common stat
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            statModel.getCommonStat({}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var regPerDay = resData.reg_per_day;
                var loginPerDay = resData.login_per_day;
                var embracePerDay = resData.embrace_per_day;
                var inspirePerDay = resData.inspire_per_day;
                var commentPerDay = resData.comment_per_day;
                var pageviewPerDay = resData.pageview_per_day;
                var totalMedia = resData.total_media;
                var regEmailPerDay = resData.reg_email_per_day;
                var regFacebookPerDay = resData.reg_facebook_per_day;
                var regGooglePerDay = resData.reg_google_per_day;
                var regUnVerifiedPerDay = resData.reg_un_verified_per_day;
                var regVerifiedPerDay = resData.reg_verified_per_day;
                self.view.attachViewHelper();
                self.render({reg_per_day: regPerDay, login_per_day: loginPerDay,
                    embrace_per_day: embracePerDay, inspire_per_day: inspirePerDay,
                    comment_per_day: commentPerDay, pageview_per_day: pageviewPerDay,
                    total_media: totalMedia, reg_email_per_day: regEmailPerDay,
                    reg_facebook_per_day: regFacebookPerDay, reg_google_per_day: regGooglePerDay,
                    reg_verified_per_day: regVerifiedPerDay, reg_un_verified_per_day: regUnVerifiedPerDay,
                    g_img: (typeof global.config.stats === 'undefined') ? '' : global.config.stats.g_img});
            });
        }
    },
    /**
     * Get media upload by day
     */
    contentUploadByDayAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var d = new Date();
            var currDate = d.getDate();
            var currMonth = d.getMonth() + 1;
            var currYear = d.getFullYear();
            var currentDay = currYear + '-' + currMonth + '-' + currDate;
            var dateCreated = self.getParam(Constant.DATE_CREATED, currentDay);
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var itemPerPage = parseInt(self.getParam(Constant.ITEM_PER_PAGE, 20));
            var mediaType = self.getParam(Constant.STAT_MEDIA_TYPE, 0);

            statModel.getContentUploadByday({date: dateCreated, page: currentPage,
                item_per_page: itemPerPage, media_type: mediaType}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var is_creativ_movement = false;
                if (resData['is_creativ_movement']) {
                    is_creativ_movement = true;
                }

                var page = self.genPaginationData(resData['media_list'],
                        parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT,
                        Constant.DEFAULT_PAGE_RANGE,
                        currentPage);
                self.view.attachViewHelper();
                self.render({data: page, media_data: resData, dateUploaded: dateCreated, typeActive: mediaType, is_creativ_movement: is_creativ_movement});
            });
        }
    },
    /**
     * Get most viewed portal
     */
    mostViewedPortalAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 10));
            statModel.getMostViewedPortal({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var portalList = resData.user;
                self.view.attachViewHelper();
                self.render({portal_list_data: portalList});
            });
        }
    },
    /**
     * Get top embracing
     */
    topEmbracingAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 15));
            statModel.getTopEmbracing({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var topEmbracingList = resData.user;
                self.view.attachViewHelper();
                self.render({list_data: topEmbracingList});
            });
        }
    },
    /**
     * Get top embrace
     */
    topEmbraceAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 15));
            statModel.getTopEmbrace({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var topEmbraceList = resData.user;
                self.view.attachViewHelper();
                self.render({list_data: topEmbraceList});
            });
        }
    },
    /**
     * Get top tag
     */
    topTagAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 50));
            statModel.getTopUsedTags({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var topTagList = resData.user;
                self.view.attachViewHelper();
                self.render({list_data: topTagList});
            });
        }
    },
    /**
     * Get top creativ categories
     */
    topCreativCategoriesAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 50));
            statModel.getTopCreativCategories({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var topTagList = resData.user;
                self.view.attachViewHelper();
                self.render({list_data: topTagList});
            });
        }
    },
    /**
     * Get highest view medias
     */
    highestViewMediaAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 10));
            statModel.getHighestViewMediaContent({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var mediaList = resData.list_media;
                self.view.attachViewHelper();
                self.render({media_data: mediaList});
            });
        }
    },
    /**
     * Get highest comment medias
     */
    highestCommentMediaAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 10));
            statModel.getHighestCommentMediaContent({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var mediaList = resData.list_media;
                self.view.attachViewHelper();
                self.render({media_data: mediaList});
            });
        }
    },
    /**
     * Get highest inspire medias
     */
    highestInspireMediaAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var limitRecords = parseInt(self.getParam(Constant.STAT_RECORD_LIMIT, 10));
            statModel.getHighestInspireMediaContent({limit: limitRecords}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var mediaList = resData.list_media;
                self.view.attachViewHelper();
                self.render({media_data: mediaList});
            });
        }
    },
    /**
     * Get beanstalkd
     */
    beanstalkdAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var dateStat = self.getParam(Constant.DATE_CREATED, '');
            statModel.getBeanstalkdStat({date: dateStat}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var beanstalkdData = resData.beantalkd_data;
                self.view.attachViewHelper();
                self.render({beantalkd_data: beanstalkdData, list_date: resData.dates});
            });
        }
    },
    /**
     * Get beanstalkd failed jobs
     */
    beanstalkdFailedAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var dateStat = self.getParam(Constant.DATE_CREATED, '');
            statModel.getBeanstalkdStatFailed({date: dateStat}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                self.view.attachViewHelper();
                self.render({list_date: resData.dates, data: resData.data});
            });
        }
    },
    /**
     * Get registration
     */
    registrationAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var d = new Date();
            var currDate = d.getDate();
            var currMonth = d.getMonth() + 1;
            var currYear = d.getFullYear();
            var currentDay = currDate + '-' + currMonth + '-' + currYear;
            var fromDate = self.getParam(Constant.STAT_REG_FROM, currentDay);
            var toDate = self.getParam(Constant.STAT_REG_TO, currentDay);
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var itemPerPage = parseInt(self.getParam(Constant.ITEM_PER_PAGE, 20));
            statModel.getRegistration({from: fromDate, to: toDate, page: currentPage,
                item_per_page: itemPerPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var userList = resData.list;
                var page = self.genPaginationData(userList,
                        parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT,
                        Constant.DEFAULT_PAGE_RANGE,
                        currentPage);
                self.view.attachViewHelper();
                self.render({user_list: userList, from: resData.from, to: resData.to, data: page});
            });
        }
    },
    /**
     * Get registration list by hours
     */
    registrationHourAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var d = new Date();
            var currDate = d.getDate();
            var currMonth = d.getMonth() + 1;
            var currYear = d.getFullYear();
            var currentDay = currDate + '-' + currMonth + '-' + currYear;
            var fromDate = self.getParam(Constant.STAT_REG_FROM, currentDay);
            var toDate = self.getParam(Constant.STAT_REG_TO, currentDay);
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            statModel.getRegistrationByHour({from: fromDate, to: toDate, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.view.attachViewHelper();
                self.render({from: resData.from, to: resData.to, list: resData.list,
                    list_hour: resData.list_hour});
            });
        }
    }
});