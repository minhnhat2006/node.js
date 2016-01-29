var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var ViralModel = model.extend({
    /**
     * Get Viral items
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getViralUsers: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_VIRAL_USER_LIST, data, callback);
    },
    /**
     * Set viral for user
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    setViral: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_VIRAL_SET, data, callback);
    },
    /**
     * Remove viral of user
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeViral: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_VIRAL_REMOVE, data, callback);
    }
});

module.exports = ViralModel;