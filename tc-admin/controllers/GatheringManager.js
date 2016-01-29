var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var gatheringManagerModel = new (require('./../models/GatheringManagerModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "gathering-manager",
    init: function() {
        gatheringManagerModel.setRestClient(this.getRestClient());
        this.setModel(gatheringManagerModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load FlagQueue Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var order = self.getParam(Constant.PARAM_GROUP_MANAGER_LIST_ORDER, 'asc');
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var orderReported = self.getParam(Constant.PARAM_GROUP_MANAGER_ORDER_BY_REPORT, '');
            var searchGather = self.getParam(Constant.PARAM_GROUP_MANAGER_SEARCH_TEXT, '');
            var featureGather = self.getParam(Constant.PARAM_GROUP_MANAGER_FEATURED, '0')

            gatheringManagerModel.getGatheringList({page: currentPage, order: order, order_reported: orderReported, gather: searchGather, feature: featureGather}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var page = self.genPaginationData(resData[Constant.RES_GATHERING_REPORTED_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page, order: order, order_reported: orderReported});
            });
        }
    }
});