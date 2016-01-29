var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var CollectionModel = model.extend({
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
     * Get user's collection items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getUserCollection: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_USER_COLLECTION, data, callback);
    },
    /**
     * pick collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    pickCollection: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_PICK_COLLECTION, data, callback);
    },
    pickCollectionTrending: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_PICK_COLLECTION_TRENDING, data, callback);
    },
    /**
     * get Collection media items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCollectionMediaItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_COLLECTION_MEDIA_ITEMS, data, callback);
    },
    /**
     * get Collection deleted media items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCollectionDeletedMediaItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_COLLECTION_DELETED_MEDIA_ITEMS, data, callback);
    },
    /**
     * get trending Collection media items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getTrendingCollectionMediaItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_TRENDING_COLLECTION_MEDIA_ITEMS, data, callback);
    },
    /**
     * remove media from collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_COLLECTION_REMOVE_MEDIA, data, callback);
    },
    /**
     * Un-remove media from collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    restoreCollectionsItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_RESTORE_MEDIA, data, callback);
    },
    /**
     * Permanently remove media from collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    permanentlyRemoveMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_COLLECTION_PERMANENTLY_REMOVE_MEDIA, data, callback);
    },
    /**
     * add media to trending collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    addMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_ADD_MEDIA, data, callback);
    },
    /**
     * Move order of media
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    moveOrder: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_MOVE_ORDER, data, callback);
    },
    /**
     * Get collection items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCollectionItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_COLLECTION_MEDIA_ITEMS, data, callback);
    },
    /**
     * update settings in the trending collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateSettingsTrendingCollection: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_UPDATE_SETTINGS, data, callback);
    },
    /**
     * show now
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    showNowTrendingCollection: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_SHOW_NOW, data, callback);
    },
    /**
     * reshow trending
     */
    reshowTrending: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_RESHOW, data, callback);
    },
    /**
     * Remove media from trending collection
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeTrendingCollectionMedias: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_COLLECTION_REMOVE_CONTENTS, data, callback);
    },
    loadmoreTrendingCollectionItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_TRENDING_COLLECTION_LOADMORE, data, callback);
    }
});

module.exports = CollectionModel;