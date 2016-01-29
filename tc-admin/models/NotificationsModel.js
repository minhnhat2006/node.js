var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var NotificationsModel = model.extend({
    /**
     * Get Mass Mailer list for selected user
     */
    getUserCount: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_NOTIFICATION_USER_LIST, data, callback);
    },
});

module.exports = NotificationsModel;