var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var errorModel = new (require('./../models/ErrorModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "error",
    init: function() {
        this.setModel(errorModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Error page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            if (this.request.session.errorData === undefined) {
                this.redirect('/stats');
            } else {
                var error = this.request.session.errorData;
                delete this.request.session.errorData;
                this.request.session.save();
                this.render(error);
            }
        }
    }
});