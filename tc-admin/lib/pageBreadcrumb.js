/**
 * P: TcPageBreadcrumb
 * @see https://www.npmjs.org/package/xml2js
 */
var _ = require('underscore');
var _s = require('underscore.string');
var util = require('util');

module.exports = function(pageBreadcrumbs) {
    this.pageBreadcrumbs = pageBreadcrumbs;
};

module.exports.prototype = {
    getBreadcrumbs: function() {
        return this.pageBreadcrumbs;
    },
    /*
     * Get page breadcrumb
     * @param {string} pageName
     * @returns {Object} pageBreadcrumb
     */
    getBreadcrumb: function(pageName) {
        var pageBreadcrumb = _.find(this.pageBreadcrumbs, function(page) {
            return (page.id === pageName);
        });

        return pageBreadcrumb === undefined ? [] : pageBreadcrumb.act;
    },
    /*
     * Set page breadcrumb key/value
     * @param {string} pageName
     * @param {string} actName
     * @param {object} keyValue
     * @returns {Object} pageBreadcrumb
     */
    setBreadcrumbKeyValue: function(pageName, actName, keyValue) {
        if (!this.pageBreadcrumbs) {
            this.pageBreadcrumbs = this.genDefaultPageBreadcrumbs();
        }

        if (_.isEmpty(keyValue)) {
            return;
        }

        var pageBreadcrumb = _.find(this.pageBreadcrumbs, function(page) {
            return (page.id === pageName);
        });

        if (pageBreadcrumb === undefined) {
            this.pageBreadcrumbs.push({id: pageName, act: [{id: actName, data: keyValue}]});
        } else {
            var actBreadcrumb = _.find(pageBreadcrumb.act, function(act) {
                return (act.id === actName);
            });

            if (actBreadcrumb === undefined) {
                actBreadcrumb = keyValue;
                pageBreadcrumb.act.push({id: actName, data: actBreadcrumb});
            } else {
                _.extend(actBreadcrumb.data, keyValue);
            }
        }
    },
    /**
     * Generate default page breadcrumb data
     * @returns {Object} pageBreadcrumb
     */
    genDefaultPageBreadcrumbs: function() {
        var result = [];
        // Comment
        result.push({id: 'comment', act: [
                {id: 'index', data: {page: 1}},
                {id: 'media', data: {page: 1}}
            ]});
        // User
        result.push({id: 'user', act: [
                {id: 'index', data: {page: 1}}
            ]});

        return result;
    }
};