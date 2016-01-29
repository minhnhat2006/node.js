var _ = require("underscore");
var QueryString = require('querystring');
var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var collectionModel = new (require('./../models/CollectionModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "collection",
    nameCollectionsShow: "collections-show",
    nameCollectionItems: "collection-items",
    nameTrendingCollection: "trending-collection",
    init: function() {
        collectionModel.setRestClient(this.getRestClient());
        this.setModel(collectionModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameCollectionsShow) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameCollectionsShow));
        } else if (this.originalActionName === this.nameCollectionItems) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameCollectionItems));
        } else if (this.originalActionName === this.nameTrendingCollection) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameTrendingCollection));
        }

    },
    /**
     * Load collection creator page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            //var searchUser = self.getParam(Constant.PARAM_USER_SEARCH_TEXT, '');
            var userCreateCollection = self.getParam(Constant.PARAM_USER_CREATE_COLLECTION, 1);
            //var userType = self.getParam(Constant.PARAM_USER_USER_TYPE, '');
            var sort = self.getParam(Constant.PARAM_USER_SORT, '');
            var order = (self.getParam(Constant.PARAM_USER_ORDER) === 'true');

            collectionModel.getCreateCollectionsList({page: currentPage, collection_creators: userCreateCollection, sort: sort, order: order}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_USER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                var queryString = self.getRequest().query;
                var user_created_params = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_USER_CREATED, order: !order});
                var user_last_login_params = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_USER_LAST_LOGIN, order: !order});
                var user_last_update_params = _.extend({}, queryString, {sort: Constant.PARAM_USER_SORT_BY_USER_LAST_UPDATE, order: !order});

                self.view.attachViewHelper();
                self.render({data: page, collection_creators: userCreateCollection, sort: sort, arrow: (order === true ? 'up' : 'down'),
                    user_created_url: QueryString.stringify(user_created_params), user_last_login_url: QueryString.stringify(user_last_login_params),
                    user_last_update_url: QueryString.stringify(user_last_update_params)});
            });
        }
    },
    /**
     * Load collection item of user
     */
    collectionsShowAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');

            collectionModel.getUserCollection({user: userId, page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var subpath = resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH];
                resData[Constant.RES_USER_USER_DATA][Constant.FIELD_USER_SUBPATH] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_USER_MEDIA_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, user: resData[Constant.RES_USER_USER_DATA]});
            });
        }
    },
    /*
     * 
     */
    collectionItemsAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
            var collectionId = self.getParam(Constant.PARAM_COLLECTION_ID, '');
            var userId = self.getParam(Constant.PARAM_USER_USER_ID, '');
            var isTrending = self.getParam(Constant.PARAM_COLLECTION_IS_TRENDING, 0);

            collectionModel.getCollectionMediaItems({collection_id: collectionId, user: userId, page: currentPage, is_trending: isTrending}, function(resData) {
                // Validate response data
                if (!self.validateRestData(resData) || !self.validateRestDataFields(resData, [Constant.RES_COLLECTION_DATA, Constant.RES_USER_MEDIA_ITEMS])) {
                    return;
                }

                var subpath = resData[Constant.RES_COLLECTION_DATA][Constant.FIELD_COLLECTION_TITLE];
                resData[Constant.RES_COLLECTION_DATA][Constant.FIELD_COLLECTION_TITLE] = subpath.charAt(0).toUpperCase() + subpath.slice(1);

                var page = self.genPaginationData(resData[Constant.RES_USER_MEDIA_ITEMS], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.render({data: page, collection: resData[Constant.RES_COLLECTION_DATA]});
            });
        }
    },
    trendingCollectionAction: function() {
        var self = this;
        var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));
        collectionModel.getTrendingCollectionMediaItems({page: currentPage}, function(resData) {
            if (!self.validateRestData(resData)) {
                return;
            }

            self.view.attachViewHelper();
            self.render({
                set: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_SELECTED],
                set_count: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_SELECTED] ? _.size(resData[Constant.RES_TRENDING_COLLECTION_ITEMS_SELECTED]) : 0,
                notset: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_QUEUE],
                timestamp: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_TIMESTAMP],
                expiretime: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_CONFIG_NUMBER],
                expire: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_EXPIRE],
                mediasize: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_CONFIG_ACTIVE_SIZE],
                relsdate: resData[Constant.RES_TRENDING_COLLECTION_ITEMS_REL_DATE]
            });
        });

    }
});