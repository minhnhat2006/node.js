var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var FlagQueueModel = model.extend({
    /**
     * Get FlagQueues list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getFlagQueueItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_FLAG_QUEUE_ITEMS, data, callback);
    },
    /**
     * Unflag one item in Flag Queue
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    unflagItem: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_FLAG_QUEUE_UNFLAG_ITEM, data, callback);
    },
    /**
     * Set an item as mature content
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    setMature: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_FLAG_QUEUE_SET_MATURE, data, callback);
    }
});

module.exports = FlagQueueModel;