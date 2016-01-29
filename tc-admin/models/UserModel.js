var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var UserModel = model.extend({
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
     * Get list of create collections user
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCreateCollectionsList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER_CREATE_COLLECTION_LIST, data, callback);
    },
    /**
     * Get user detail
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getUserDetail: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_USER_DETAIL, data, callback);
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
     * Get Tallcat's media items for credit
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getUserMediaCredit: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER_MEDIA_CREDIT, data, callback);
    },
    /**
     * Get Tallcat's blog items for credit
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getUserBlogCredit: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER_BLOG_CREDIT, data, callback);
    },
    /**
     * Delete a User
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    deleteUser: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_USER_DELETE, data, callback);
    },
    /**
     * Lock a User
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    lockUser: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_USER_LOCK, data, callback);
    },
    /**
     * create collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    createCollection: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_CREATE_COLLECTION, data, callback);
    },
    /**
     * get Admin1 list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getAdmin1List: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_GET_ADMIN1_LIST, data, callback);
    },
    /**
     * Update a User
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateUser: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.put(Constant.API_PATH_USER_UPDATE, data, callback);
    },
    /**
     * Update a User
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updatePassword: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.put(Constant.API_PATH_USER_UPDATE_PASSWORD, data, callback);
    },
    /**
     * Give Credit on Tallcat's Media to user
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    giveCreditOnTallcatMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_USER_GIVE_CREDIT_ON_TALLCAT_MEDIA, data, callback);
    },
    /**
     * Send warning email to media owner
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    warnMediaToUser: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_USER_WARN_MEDIA, data, callback);
    },
    /**
     * Flag user as s Tallcat Staff user
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    setFlag: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_USER_SET_FLAG, data, callback);
    },
    /**
     * Delete a media item
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    deleteMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_USER_DELETE_MEDIA, data, callback);
    },
    /**
     * Get Graph Builder users list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getEmbracings: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER_EMBRACING_LIST, data, callback);
    },
});

module.exports = UserModel;