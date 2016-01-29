var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var changeModel = new (require('./../models/ChangeModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "change",
    init: function() {
        changeModel.setRestClient(this.getRestClient());
        this.setModel(changeModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Change Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var search = self.getParam(Constant.PARAM_CHANGE_SEARCH, '');

            changeModel.getChangeUsersList({page: currentPage, search: search}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_BLOG_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, q: search});
            });
        }
    }
});