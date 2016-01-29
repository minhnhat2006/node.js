var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var FlagMessageModel = model.extend({
    /**
     * Get FlagQueues list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getFlagMessageItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_FLAG_MESSAGE_ITEMS, data, callback);
    },
    /**
     * Unflag one item in Flag Queue
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    unflagMessage: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_FLAG_MESSAGE_UNFLAG_ITEM, data, callback);
    }
});

module.exports = FlagMessageModel;