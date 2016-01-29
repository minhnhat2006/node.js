var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var authModel = new (require('./../models/AuthModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "login",
    init: function() {
        if (this.request.session && this.request.session.isLoggedIn === true) {
            this.redirect('/');
        } else {
            authModel.setRestClient(this.getRestClient());
            this.setModel(authModel);
            this.setView(new View(this.getResponse(), this.name));
        }
    },
    /**
     * Login to system
     */
    indexAction: function() {
        var _self = this;

        if (this.request.method === 'GET') {
            _self.render({});
        }
    }
});