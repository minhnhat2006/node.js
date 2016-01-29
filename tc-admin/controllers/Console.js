var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var consoleModel = new (require('./../models/ConsoleModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "console",
    nameGetToken: 'get-token',
    init: function() {
        consoleModel.setRestClient(this.getRestClient());
        this.setModel(consoleModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameGetToken) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameGetToken));
        }
    },
    /**
     * Load Console Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;

            self.view.attachViewHelper();
            self.render({accessToken: self.request.session.c_accessToken, deviceId: self.request.session.c_deviceId, username: self.request.session.c_username, user: self.request.session.c_userid});
        }
    },
    /**
     * Load Edit Console page
     */
    getTokenAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            self.render({});
        }
    }
});