var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var filterBuilderModel = new (require('./../models/FilterBuilderModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "filter-builder",
    nameFilterDetail: 'detail',
    nameLoadMore: 'more',
    init: function() {
        filterBuilderModel.setRestClient(this.getRestClient());
        this.setModel(filterBuilderModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameFilterDetail) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameFilterDetail));
        } else if (this.originalActionName === this.nameLoadMore) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameLoadMore));
        }
    },
    /**
     * Load Filter Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, 1));

            filterBuilderModel.getFilters({page: currentPage}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                var page = self.genPaginationData(resData[Constant.RES_FILTER_BUILDER_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                        Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                self.view.attachViewHelper();
                self.render({data: page});
            });
        }
    },
    /**
     * Load Filter data
     */
    detailAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var id = self.getParam(Constant.PARAM_FILTER_BUILDER_ID, '');
            var test = self.getParam(Constant.PARAM_FILTER_BUILDER_RUN, '');
            var countries = self.request.session.countries;
            var states = self.request.session.states;

            if (!countries) {
                filterBuilderModel.getCountries({}, function(resData) {
                    if (!self.validateRestData(resData)) {
                        return;
                    }

                    countries = resData[Constant.RES_FILTER_BUILDER_COUNTRIES];
                    self.request.session.countries = countries;
                    self.request.session.save();
                });
            }

            if (!states) {
                filterBuilderModel.getStates({}, function(resData) {
                    if (!self.validateRestData(resData)) {
                        return;
                    }

                    states = resData[Constant.RES_FILTER_BUILDER_STATES];
                    self.request.session.states = states;
                    self.request.session.save();
                });
            }

            if (id) {
                filterBuilderModel.getFilter({id: id, run: test}, function(resData) {
                    if (!self.validateRestData(resData)) {
                        return;
                    }

                    self.view.attachViewHelper();
                    self.render({data: resData[Constant.RES_FILTER_BUILDER_DETAIL],
                        content: resData[Constant.RES_FILTER_BUILDER_CONTENT],
                        users: resData[Constant.RES_FILTER_BUILDER_USER],
                        countries: countries,
                        states: states,
                        id: id, type: ''});
                });
            } else {
                self.render({type: 'add'});
            }
        }
    },
    /**
     * Load more Filter data
     */
    moreAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var id = self.getParam(Constant.PARAM_FILTER_BUILDER_ID, '');
            var itemIndex = parseInt(self.getParam(Constant.PARAM_FILTER_BUILDER_ITEM_INDEX, '0'));

            filterBuilderModel.getFilter({id: id, run: 1, index: itemIndex}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.render({data: resData[Constant.RES_FILTER_BUILDER_DETAIL], content: resData[Constant.RES_FILTER_BUILDER_CONTENT],
                    users: resData[Constant.RES_FILTER_BUILDER_USER], itemIndex: itemIndex});
            });
        }
    }
});