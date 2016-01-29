var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var GatheringReportedModel = model.extend({
    /**
     * Get GatheringReported list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getReportedItems: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_GATHERING_REPORTED_ITEMS, data, callback);
    }

});

module.exports = GatheringReportedModel;