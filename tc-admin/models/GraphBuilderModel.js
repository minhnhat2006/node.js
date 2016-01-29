var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var GraphBuilderModel = model.extend({
    /**
     * Get Graph Builder users list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getGraphBuilderUsers: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_GRAPH_BUILDER_USER_LIST, data, callback);
    },
    /**
     * Sync user graph
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    addGraph: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GRAPH_BUILDER_ADD_GRAPH, data, callback);
    },
    /**
     * Add Embracing relationship for users
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    addEmbrace: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GRAPH_BUILDER_ADD_EMBRACING, data, callback);
    },
    /**
     * Remove Embracing relationship of users
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeEmbrace: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_GRAPH_BUILDER_REMOVE_EMBRACING, data, callback);
    }
});

module.exports = GraphBuilderModel;