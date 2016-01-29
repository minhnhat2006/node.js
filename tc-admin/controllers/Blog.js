var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var blogModel = new (require('./../models/BlogModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "blog",
    nameEditBlog: 'edit',
    init: function() {
        blogModel.setRestClient(this.getRestClient());
        this.setModel(blogModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameEditBlog) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameEditBlog));
        }
    },
    /**
     * Load Blog Manager page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var currentPage = parseInt(self.getParam(Constant.DEFAULT_PAGE_PARAM, '1'));
            var searchCriteria = self.getParam(Constant.SEARCH_CRITERIA, '');
            if (searchCriteria) {
                blogModel.searchBlog({q: searchCriteria, page: currentPage}, function(resData) {
                    if (!self.validateRestData(resData)) {
                        return;
                    }

                    var page = self.genPaginationData(resData[Constant.RES_BLOG_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                            Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                    self.view.attachViewHelper();
                    self.render({data: page});
                });
            } else {
                blogModel.getBlogsList({page: currentPage}, function(resData) {
                    if (!self.validateRestData(resData)) {
                        return;
                    }

                    var page = self.genPaginationData(resData[Constant.RES_BLOG_LIST], parseInt(resData[Constant.DEFAULT_PAGE_ROW_TOTAL]),
                            Constant.DEFAULT_PAGE_COUNT, Constant.DEFAULT_PAGE_RANGE, currentPage);

                    self.view.attachViewHelper();
                    self.render({data: page});
                });
            }
        }
    },
    /**
     * Load Edit Blog page
     */
    editAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var blogId = self.getParam(Constant.PARAM_BLOG_ID, '');

            blogModel.getBlogDetail({id: blogId}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.view.attachViewHelper();
                self.render({data: resData[Constant.RES_BLOG_DETAIL]});
            });
        }
    }
});