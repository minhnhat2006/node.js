var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var notificationsModel = new (require('./../models/NotificationsModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "notifications",
    init: function() {
        notificationsModel.setRestClient(this.getRestClient());
        this.setModel(notificationsModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Mass Mailer Manager page
     */
    indexAction: function() {

        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;

            notificationsModel.getUserCount({}, function(resData) {

                if (!self.validateRestData(resData)) {
                    return;
                }
                self.render({notifications_user: resData[Constant.RES_NOTIFICATION_USER_COUNT]});
            });
        }
    }
});