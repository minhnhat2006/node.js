var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var MassMailerModel = model.extend({
    /**
     * Get Mass Mailer list for selected user
     */
    getMassMailersList: function(data, callback) {
        var restClient = this.getRestClient();

        if (typeof data.upage_count === "undefined") {
            data.upage_count = Constant.DEFAULT_PAGE_COUNT;
        }

        restClient.get(Constant.API_PATH_MASS_MAILER_LIST, data, callback);
    },
    /**
     * Get Mass Mailer list for selected user
     */
    getMassMailersListForUser: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_MASS_MAILER_LIST_FOR_USER, data, callback);
    },
    /**
     * Add a user to Mass Mailers list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    addUserToMassMailer: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MASS_MAILER_ADD_USER, data, callback);
    },
    /**
     * Remove a user from Mass Mailers list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    removeUserFromMassMailer: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MASS_MAILER_REMOVE_USER, data, callback);
    },
    /**
     * Add a new Mass Mailer
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    addMassMailer: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MASS_MAILER_ADD, data, callback);
    },
    /**
     * Delete a Mass Mailer
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    deleteMassMailer: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_MASS_MAILER_DELETE, data, callback);
    },
    /**
     * Update a Mass Mailer name
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateMassMailer: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.put(Constant.API_PATH_MASS_MAILER_UPDATE, data, callback);
    },
    /**
     * Send a message to all users of one Mass Mailer
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    sendMassMailerMessage: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_MASS_MAILER_SEND_MESSAGE, data, callback);
    }
});

module.exports = MassMailerModel;