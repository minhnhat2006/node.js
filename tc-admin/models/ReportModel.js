var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var ReportModel = model.extend({
    /**
     * Get Report data
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getReportData: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_REPORT_DATA, data, callback);
    },
    /**
     * Get Registered country list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getRegisteredCountryList: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_REPORT_COUNTRY_LIST, data, callback);
    },
    /**
     * Get Registered growth by country
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getRegisteredCountryGrowth: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_REPORT_COUNTRY_GROWTH, data, callback);
    },
});

module.exports = ReportModel;