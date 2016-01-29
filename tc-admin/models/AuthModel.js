var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var AuthModel = model.extend({
    authenticate: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_AUTH, data, callback);
    }
});

module.exports = AuthModel;