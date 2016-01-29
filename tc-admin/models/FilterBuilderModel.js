var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var FilterBuilderModel = model.extend({
    /**
     * Get all Countries
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCountries: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_FILTER_BUILDER_COUNTRIES, data, callback);
    },
    /**
     * Get all States
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getStates: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_FILTER_BUILDER_STATES, data, callback);
    },
    /**
     * Get all Filters
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getFilters: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_FILTER_BUILDER_LIST, data, callback);
    },
    /**
     * Get Filter data
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getFilter: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_FILTER_BUILDER_DETAIL, data, callback);
    },
    /**
     * Add a new Filter
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    addFilter: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_FILTER_BUILDER_ADD, data, callback);
    },
    /**
     * Delete a Filter
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    deleteFilter: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_FILTER_BUILDER_DELETE, data, callback);
    },
    /**
     * Update a Filter name
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateFilter: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.put(Constant.API_PATH_FILTER_BUILDER_UPDATE, data, callback);
    },
    /**
     * Run a Filter to get data
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    runFilter: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_FILTER_BUILDER_RUN, data, callback);
    }
});

module.exports = FilterBuilderModel;