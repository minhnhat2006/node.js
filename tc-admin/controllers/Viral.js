var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var viralModel = new (require('./../models/ViralModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "viral",
    init: function() {
        viralModel.setRestClient(this.getRestClient());
        this.setModel(viralModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Viral Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var searchUser = self.getParam(Constant.PARAM_USER_SEARCH_TEXT, '');
            var vip = self.getParam(Constant.PARAM_VIRAL_USER_VIRAL, '');

            viralModel.getViralUsers({page: currentPage, user: searchUser, vip: vip}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_VIRAL_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page, s_user: searchUser, user_viral: vip});
            });
        }
    }
});