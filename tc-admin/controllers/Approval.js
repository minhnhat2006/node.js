var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var approvalModel = new (require('./../models/ApprovalModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "approval",
    init: function() {
        approvalModel.setRestClient(this.getRestClient());
        this.setModel(approvalModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Waiting for Approval page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));

            approvalModel.getRegistrationWaitingList({page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);
                self.render({data: page});
            });
        }
    }
});