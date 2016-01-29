var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var commentModel = new (require('./../models/CommentModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "comment",
    nameMedia: 'media',
    nameCommentList: 'comment',
    nameCommentEdit: 'edit',
    init: function() {
        commentModel.setRestClient(this.getRestClient());
        this.setModel(commentModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameMedia) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameMedia));
        } else if (this.originalActionName === this.nameCommentList) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameCommentList));
        } else if (this.originalActionName === this.nameCommentEdit) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameCommentEdit));
        }
    },
    /**
     * Load Comment Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var searchUser = self.getParam(Constant.PARAM_USER_SEARCH_TEXT, '');
            var userStatus = self.getParam(Constant.PARAM_USER_USER_STATUS, '');
            var userType = self.getParam(Constant.PARAM_USER_USER_TYPE, '');

            commentModel.getUsersList({page: currentPage, user: searchUser, user_status: userStatus, user_type: userType}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page, s_user: searchUser, user_status: userStatus, user_type: userType, is_user: true, is_media: false, is_comment: false});
            });
        }
    },
    /**
     * Load User's Media page
     */
    mediaAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');

            commentModel.getUserMediaItems({user: userId, page: currentPage, iscm: 1}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var subpath = resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH];
                resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_USER_MEDIA_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA], is_user: false, is_media: true, is_comment: false});
            });
        }
    },
    /**
     * Load Media's Comment page
     */
    commentAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var mediaId = self.getParam(Constant.PARAM_COMMENT_MEDIA_ID, '');
            var mediaType = self.getParam(Constant.PARAM_COMMENT_MEDIA_TYPE, '');

            commentModel.getMediaCommentsList({media_id: mediaId, media_type: mediaType, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var subpath = resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH];
                resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_COMMENT_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA], media: resData[Constant.RES_COMMENT_MEDIA], is_user: false, is_media: false, is_comment: true});
            });
        }
    },
    /**
     * Load Edit Comment page
     */
    editAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var mediaId = self.getParam(Constant.PARAM_COMMENT_MEDIA_ID, '');
            var mediaType = self.getParam(Constant.PARAM_COMMENT_MEDIA_TYPE, '');
            var key = self.getParam(Constant.PARAM_COMMENT_KEY, '');

            commentModel.getCommentDetail({media_id: mediaId, media_type: mediaType, comment_key: key}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.view.attachViewHelper();
                self.render({data: resData[Constant.RES_COMMENT_DETAIL]});
            });
        }
    }
});