var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var gatheringReportedModel = new (require('./../models/GatheringReportedModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "gathering-reported",
    init: function() {
        gatheringReportedModel.setRestClient(this.getRestClient());
        this.setModel(gatheringReportedModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load FlagQueue Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var order = self.getParam(Constant.PARAM_GROUP_REPORTED_ORDER, 'asc');

            gatheringReportedModel.getReportedItems({order: order}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.view.attachViewHelper();
                self.render({data: resData[Constant.RES_GATHERING_REPORTED_ITEMS], order: order});
            });

        }
    }
});