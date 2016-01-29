var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var StaffPickModel = model.extend({
    /**
     * Get StaffPick items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getStaffPickItems: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_STAFF_PICK_ITEMS, data, callback);
    },
    /**
     * Remove media from staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeStaffPickMedias: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAFF_PICK_REMOVE, data, callback);
    },
    /**
     * Replace the media in the staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    replaceStaffPickMedias: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAFF_PICK_REPLACE, data, callback);
    },
    /**
     * Replace the media in the staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    showNowStaffPickMedias: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAFF_PICK_SHOWNOW, data, callback);
    },
    /**
     * update settings in the staff pick
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateSettingsStaffPick: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAFF_PICK_UPDATE_SETTINGS, data, callback);
    },
    /**
     * reshow staffpick 
     */
    reshowStaffPick: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAFF_PICK_RESHOW, data, callback);
    },
    loadmoreStaffPick: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAFF_PICK_ITEMS, data, callback);
    },
    /**
     * Un-remove media
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    restoreStaffpickItem: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAFF_PICK_RESTORE_MEDIA, data, callback);
    }
});

module.exports = StaffPickModel;