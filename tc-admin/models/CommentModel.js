var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var CommentModel = model.extend({
    /**
     * Get list of users
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getUsersList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER, data, callback);
    },
    /**
     * Get user's media items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getUserMediaItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER_MEDIA_ITEMS, data, callback);
    },
    /**
     * Get Comments list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getMediaCommentsList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_COMMENT_LIST, data, callback);
    },
    /**
     * Get detail data of comment
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCommentDetail: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_COMMENT_DETAIL, data, callback);
    },
    /**
     * Delete a Comment
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    deleteComment: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_COMMENT_DELETE, data, callback);
    },
    /**
     * Update a Comment
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateComment: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.put(Constant.API_PATH_COMMENT_UPDATE, data, callback);
    }
});

module.exports = CommentModel;