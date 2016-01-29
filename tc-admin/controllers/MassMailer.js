var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var massMailerModel = new (require('./../models/MassMailerModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "mass-mailer",
    init: function() {
        massMailerModel.setRestClient(this.getRestClient());
        this.setModel(massMailerModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Mass Mailer Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.PARAM_MASS_MAILER_PAGE_USER, 1));
            var massMailerId = self.getParam(Constant.PARAM_MASS_MAILER_ID);

            massMailerModel.getMassMailersList({upage: currentPage, mid: massMailerId}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_MASS_MAILER_USER_LIST], parseInt(resData[Constant.RES_MASS_MAILER_USER_LIST_COUNT]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({massmailers: resData[Constant.RES_MASS_MAILER_LIST], users: page, mid: massMailerId});
            });
        }
    }
});