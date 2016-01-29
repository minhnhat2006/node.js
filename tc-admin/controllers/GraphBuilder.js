var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var graphBuilderModel = new (require('./../models/GraphBuilderModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "graph-builder",
    init: function() {
        graphBuilderModel.setRestClient(this.getRestClient());
        this.setModel(graphBuilderModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load GraphBuilder Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));

            graphBuilderModel.getGraphBuilderUsers({page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_GRAPH_BUILDER_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page, all_users: resData[Constant.RES_GRAPH_BUILDER_ALL_USER]});
            });
        }
    }
});