var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var flagMessageModel = new (require('./../models/FlagMessageModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "flag-message",
    init: function() {
        flagMessageModel.setRestClient(this.getRestClient());
        this.setModel(flagMessageModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load FlagMessage Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;

            flagMessageModel.getFlagMessageItems({}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                //console.log(resData[Constant.RES_FLAG_MESSAGE_ITEMS]);
                self.view.attachViewHelper();
                self.render({data: resData[Constant.RES_FLAG_MESSAGE_ITEMS]});
            });
        }
    }
});