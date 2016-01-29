var BaseController = require("./Base");
var _ = require("underscore");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var staffPickModel = new (require('./../models/StaffPickModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "staff-pick",
    init: function() {
        staffPickModel.setRestClient(this.getRestClient());
        this.setModel(staffPickModel);
        this.setView(new View(this.getResponse(), this.name));
    },
    /**
     * Load StaffPick Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var mediaType = parseInt(self.getParam(Constant.RES_STAFF_PICK_MEDIA_TYPE, 0));

            staffPickModel.getStaffPickItems({page: currentPage, media_type: mediaType}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

//                var page = self.genPaginationData(_.union(resData[Constant.RES_STAFF_PICK_SELECTED], resData[Constant.RES_STAFF_PICK_NOT_SELECTED]),
//                        parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]), 20, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({//data: page,
                    set: resData[Constant.RES_STAFF_PICK_SELECTED],
                    set_count: resData[Constant.RES_STAFF_PICK_SELECTED] ? _.size(resData[Constant.RES_STAFF_PICK_SELECTED]) : 0,
                    notset: resData[Constant.RES_STAFF_PICK_NOT_SELECTED],
                    mediafilter: resData[Constant.RES_STAFF_PICK_MEDIA_TYPE],
//                    expire: resData[Constant.RES_STAFF_PICK_EXPIRE],
                    expiretime: resData[Constant.RES_STAFF_PICK_EXPIRE_NUMBER],
                    relsdate: resData[Constant.RES_STAFF_PICK_CONFIG_REL_DATE],
                    mediasize: resData[Constant.RES_STAFF_PICK_CONFIG_MEDIA_SIZE],
                    collectionsize: resData[Constant.RES_STAFF_PICK_CONFIG_COLLECTION_SIZE],
                    type: mediaType
                });
            });
        }
    }
});