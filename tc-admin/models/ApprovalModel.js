var _ = require("underscore");
var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var ApprovalModel = model.extend({
    /**
     * Get pending registrations list
     */
    getRegistrationWaitingList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_APPROVAL, data, callback);
    },
    /**
     * Approve a list of pending registrations
     */
    approveRegistrations: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_APPROVAL_APPROVE, {'email[]': data['email']}, callback);
    }
});

module.exports = ApprovalModel;