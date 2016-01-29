var BaseController = require("./Base");
var Constant = require('./../lib/Constants');
var homeModel = new (require('./../models/HomeModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "index",
    init: function() {
        if (this.request.session && this.request.session.isLoggedIn === true) {
            homeModel.setRestClient(this.getRequest().tcRestClient);
            this.setModel(homeModel);
            this.setView(new View(this.getResponse(), this.name));
            this.view.user = this.request.session.user;
        } else {
            this.redirect('/login');
        }
    },
    indexAction: function() {
        if (this.request.method === 'GET') {
            // Redirect to Statistic page
            this.redirect('/stats');
        }
    }
});