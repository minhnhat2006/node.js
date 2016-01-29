var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var MediaModel = model.extend({
    /**
     * Get media 
     */
    getMedias: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_GET_MEDIA, data, callback);
    },
    /**
     * Delete media
     */
    deleteMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_DELETE_MEDIA, data, callback);
    }
});

module.exports = MediaModel;