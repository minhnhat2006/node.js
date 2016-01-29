var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var GatheringManagerModel = model.extend({
    /**
     * Get list gathering
     * 
     */
    getGatheringList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_GATHERING_LIST_ITEMS, data, callback);
    },
    /**
     * Get GatheringReported list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getReportedItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_GATHERING_REPORTED_ITEMS, data, callback);
    },
    /**
     * Unreport group
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    unreportGroup: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GATHERING_REPORTED_UNREPORTED_ITEM, data, callback);
    },
    /**
     * Delete group
     * @type GatheringReportedModel
     */
    deleteGroup: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GATHERING_REPORTED_DELETE_ITEM, data, callback);
    },
    /**
     * set mature
     * @type GatheringReportedModel
     */
    setMatureGroup: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GATHERING_REPORTED_SET_MATURE, data, callback);
    },
    /**
     * Send a message to user owner group
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    sendMessageToOwner: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GATHERING_MANAGER_SEND_MESSAGE, data, callback);
    },
    /**
     * Send a message to user owner group
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    setGatheringFeature: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GATHERING_MANAGER_SET_FEATURE, data, callback);
    },
    setBaseNumberUsers: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GATHERING_MANAGER_SET_BASE_NUMBER_USERS, data, callback);
    }
});

module.exports = GatheringManagerModel;