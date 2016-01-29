var BaseController = require("./Base");
var Crypto = require('crypto');
var Constant = require('./../lib/Constants');
var magazineModel = new (require('./../models/MagazineModel'));
var View = require("./../views/Base");

module.exports = BaseController.eat({
    name: "magazine",
    nameAddCover: 'add-cover',
    nameAddContent: 'add-content',
    nameViewIssue: 'issue',
    init: function() {
        magazineModel.setRestClient(this.getRestClient());
        this.setModel(magazineModel);

        if (this.originalActionName === Constant.CONTROLLER_ACTION_DEFAULT) {
            this.setView(new View(this.getResponse(), this.name));
        } else if (this.originalActionName === this.nameAddCover) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameAddCover));
        } else if (this.originalActionName === this.nameAddContent) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameAddContent));
        } else if (this.originalActionName === this.nameViewIssue) {
            this.setView(new View(this.getResponse(), this.name + '/' + this.nameViewIssue));
        }
    },
    /**
     * Load Magazine page
     */
    indexAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var issueId = self.getParam(Constant.ISSUE_ID);

            magazineModel.getIssue({id: issueId}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.render({data: resData});
            });
        }
    },
    /**
     * Add issue's cover.
     */
    addCoverAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            self.render({});
        }
    },
    /**
     * Add issue's content.
     */
    addContentAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            self.render({});
        }
    },
    /**
     * View an issue.
     */
    issueAction: function() {
        if (this.request.method === Constant.REQUEST_METHOD_GET) {
            var self = this;
            var issueId = self.getParam(Constant.ISSUE_ID);

            magazineModel.getIssue({id: issueId}, function(resData) {
                if (!self.validateRestData(resData)) {
                    return;
                }

                self.render({data: resData});
            });
        }
    }
});