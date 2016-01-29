var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var flagQueueModel = new (require('./../models/FlagQueueModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "flag-queue",
    init: function() {
        flagQueueModel.setRestClient(this.getRestClient());
        this.setModel(flagQueueModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load FlagQueue Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var order = parseInt(self.getParam(Constant.PARAM_FLAG_QUEUE_ORDER, 'asc'));

            flagQueueModel.getFlagQueueItems({order: order}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.view.attachViewHelper();
                self.render({data: resData[Constant.RES_FLAG_QUEUE_ITEMS], order: order});
            });
        }
    }
});