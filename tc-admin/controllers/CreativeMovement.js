var BaseController = require("./Base");
var _ = require("underscore");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var creativeMovementModel = new (require('./../models/CreativeMovementModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "creative-movement",
    init: function() {
        creativeMovementModel.setRestClient(this.getRestClient());
        this.setModel(creativeMovementModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load Creatve Movement action Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
//            var actionType = parseInt(self.getParam(Constant.RES_MOVEMENT_ACTION_TYPE, Constant.DEFAULT_MOVEMENT_ACTION));
            var mediaType = parseInt(self.getParam(Constant.RES_MOVEMENT_INSPIRED_MEDIA_TYPE, 0));
            creativeMovementModel.getMovementInspiredItems({page: currentPage, media_type: mediaType}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

//                var page = self.genPaginationData(_.union(resData[Constant.RES_MOVEMENT_INSPIRED_SELECTED], resData[Constant.RES_MOVEMENT_INSPIRED_QUEUE]),
//                        parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]), Constant.DEFAULT_CURATOR_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({
                    set: resData[Constant.RES_MOVEMENT_INSPIRED_SELECTED],
                    set_count: resData[Constant.RES_MOVEMENT_INSPIRED_SELECTED] ? _.size(resData[Constant.RES_MOVEMENT_INSPIRED_SELECTED]) : 0,
                    notset: resData[Constant.RES_MOVEMENT_INSPIRED_QUEUE],
                    mediafilter: resData[Constant.RES_MOVEMENT_INSPIRED_MEDIA_TYPE],
                    timestamp: resData[Constant.RES_MOVEMENT_INSPIRED_TIMESTAMP],
                    expiretime: resData[Constant.RES_MOVEMENT_INSPIRED_CONFIG_NUMBER],
                    expire: resData[Constant.RES_MOVEMENT_INSPIRED_EXPIRE],
                    mediasize: resData[Constant.RES_MOVEMENT_INSPIRED_CONFIG_ACTIVE_SIZE],
                    relsdate: resData[Constant.RES_MOVEMENT_INSPIRED_REL_DATE]
                });
            });
        }
    }
});