var _ = require("underscore");
var QueryString = require('querystring');
var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var mediaModel = new (require('./../models/MediaModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "media",
    init: function() {
        mediaModel.setRestClient(this.getRestClient());
        this.setModel(mediaModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        }
    },
    /**
     * Load common stat
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var searchCriteria = self.getParam(Constant.SEARCH_CRITERIA, '');
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var itemPerPage = parseInt(self.getParam(Constant.ITEM_PER_PAGE, 20));
            var mediaType = self.getParam(Constant.STAT_MEDIA_TYPE, Constant.STAT_DEFAULT_MEDIA_TYPE);
            mediaModel.getMedias({q: searchCriteria, page: currentPage, 
                item_per_page: itemPerPage, media_type: mediaType}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }
                var listMedia = resData.media_list;
                var page = self.genPaginationData(listMedia,
                    parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                    Constant.DEFAULT_PAGE_COUNT, 
                    Constant.DEFAULT_PAGE_RANGE, 
                    currentPage);
                self.view.attachViewHelper();
                self.render({data: page, list_media: listMedia});   
            });
        }
    }
});