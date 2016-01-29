var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var CreativeMovementModel = model.extend({
    /**
     * Get inspired items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getMovementInspiredItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_MOVEMENT_INSPIRED_ITEMS, data, callback);
    },
    /**
     * Remove media from staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeMovementInspiredMedias: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MOVEMENT_REMOVE_CONTENTS, data, callback);
    },
    /**
     * update settings in the staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateMovementInspiredSettings: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MOVEMENT_INSPIRED_UPDATE_SETTINGS, data, callback);
    },
    /**
     * update settings in the staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    showNowMovementInspired: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MOVEMENT_INSPIRED_SHOW_NOW, data, callback);
    },
    /**
     * reshow movement inspired 
     */
    reshowMovement: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MOVEMENT_INSPIRED_RESHOW, data, callback);
    },
    loadmoreMovementInspiredItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_MOVEMENT_INSPIRED_ITEMS, data, callback);
    },
    /**
     * Un-remove media
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    restoreMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MOVEMENT_INSPIRED_RESTORE_MEDIA, data, callback);
    }
});

module.exports = CreativeMovementModel;