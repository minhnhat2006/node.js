var _ = require("underscore");
var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var MagazineModel = model.extend({
    getIssue: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_MAGAZINE_GET_BY_ID, data, callback);
    },
    saveCover: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MAGAZINE_COVER_SAVE, data, callback);
    },
    saveContent: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MAGAZINE_CONTENT_SAVE, {'email[]': data['email']}, callback);
    }
});

module.exports = MagazineModel;