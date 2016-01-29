var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var ConsoleModel = model.extend({
    /**
     * Get Access Token
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getAccessToken: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_CONSOLE_GET_ACCESS_TOKEN, data, callback);
    },
    /**
     * Send a request to call Rest API
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    callAPI: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_CONSOLE_CALL_API, data, callback);
    }
});

module.exports = ConsoleModel;