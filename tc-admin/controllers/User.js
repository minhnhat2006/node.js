var _ = require("underscore");
var QueryString = require('querystring');
var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var userModel = new (require('./../models/UserModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "user",
    nameEditUser: 'edit-user',
    nameEmbracerManager: 'embracer-manager',
    nameMediaItems: 'media-items',
    nameMediaCredit: 'give-media-credit',
    nameBlogCredit: 'give-blog-credit',
    init: function() {
        userModel.setRestClient(this.getRestClient());
        this.setModel(userModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameEditUser) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameEditUser));
        } else if (this.originalActionName === this.nameEmbracerManager) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameEmbracerManager));
        } else if (this.originalActionName === this.nameMediaItems) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameMediaItems));
        } else if (this.originalActionName === this.nameMediaCredit) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameMediaCredit));
        } else if (this.originalActionName === this.nameBlogCredit) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameBlogCredit));
        }
    },
    /**
     * Load User Manager page
     */


    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var searchStatus = parseInt(self.getParam(Constant.PARAM_USER_SEARCH_STATUS, 0));
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var searchUser = self.getParam(Constant.PARAM_USER_SEARCH_TEXT, '');
            var userStatus = self.getParam(Constant.PARAM_USER_USER_STATUS, '');
            var userType = self.getParam(Constant.PARAM_USER_USER_TYPE, '');
            var userCountry = self.getParam(Constant.PARAM_USER_USER_COUNTRY, '');
            var userAdmin1 = self.getParam(Constant.PARAM_USER_USER_ADMIN1, '');
            var sort = self.getParam(Constant.PARAM_USER_SORT, '');
            var order = (self.getParam(Constant.PARAM_USER_ORDER) === 'true');

            userModel.getUsersList({is_search: searchStatus, page: currentPage, user: searchUser, user_status: userStatus, user_type: userType, user_country: userCountry, user_admin1: userAdmin1, sort: sort, order: order}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                var queryString = self.getRequest().query;
                var user_created_params = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_USER_CREATED, order: !order});
                var user_last_login_params = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_USER_LAST_LOGIN, order: !order});
                var user_last_update_params = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_USER_LAST_UPDATE, order: !order});
                var number_of_logins = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_NUMBER_OF_LOGINS, order: !order});

                self.view.attachViewHelper();
                self.render({data: page, s_user: searchUser, user_status: userStatus, user_type: userType, user_country: userCountry, sort: sort, arrow: (order === true ? 'up' : 'down'),
                    user_created_url: QueryString.stringify(user_created_params), user_last_login_url: QueryString.stringify(user_last_login_params),
                    user_last_update_url: QueryString.stringify(user_last_update_params), number_of_logins: QueryString.stringify(number_of_logins)});
            });
        }
    },
    /**
     * Load Edit User page
     */
    editUserAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');

            userModel.getUserDetail({user: userId}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.render({data: resData[Constant.RES_USER_USER_DATA]});
            });
        }
    },
    /**
     * Load Media Items page
     */
    mediaItemsAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');

            userModel.getUserMediaItems({user: userId, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var subpath = resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH];
                resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_USER_MEDIA_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA]});
            });
        }
    },
    /**
     * Load Give Credit on Media page
     */
    giveMediaCreditAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');

            userModel.getUserMediaCredit({user: userId, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var subpath = resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH];
                resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_USER_MEDIA_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA]});
            });
        }
    },
    /**
     * Load Give Credit on Blog page
     */
    giveBlogCreditAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');

            userModel.getUserBlogCredit({user: userId, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var subpath = resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH];
                resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_USER_MEDIA_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA]});
            });
        }
    },
    /**
     * Load Embracer Manager page for a User
     */
    embracerManagerAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var userid = self.getParam(Constant.PARAM_USER_USER_ID, '');
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));

            userModel.getEmbracings({user: userid, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA]});
            });
        }
    }
});