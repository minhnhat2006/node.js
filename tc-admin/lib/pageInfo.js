/**
 * P: TcPageInfo
 * @param string resFile
 * @param object opts
 * @returns TcPageInfo
 * @see https://www.npmjs.org/package/xml2js
 */
var _ = require('underscore');
var _s = require('underscore.string');
var fs = require('fs');
var Xml2js = require('xml2js');
var util = require('util');

var TcPageInfo = function(resFile, opts) {

    var pageInfo = null;

    var parser = new Xml2js.Parser();
    fs.readFile(resFile, function(err, data) {
        parser.parseString(data, function(err, result) {
            pageInfo = result;
            //console.log(util.inspect(result, false, null))
            //console.log('Done');
        });
    });

    /**
     * Get page infos after parsing
     * @returns {Object}
     */
    function getPageInfos() {
        return pageInfo;
    }

    /*
     * Get page and associated actions
     * @param {string} pageName
     * @returns {Object} page
     */
    function getPage(pageName) {
        var pages = getPageInfos().pages.page;
        var pageInfo = _.find(pages, function(page) {
            return (page['$'].id === pageName);
        });

        return pageInfo;
    }

    /*
     * Get an associated action of page
     * @param {Object} page
     * @returns {Object} Action
     */
    function getAction(page, actName) {
        var action = _.find(page.action, function(act) {
            return act['$'].id === actName;
        });

        return action;
    }

    /**
     * Get page info match with page name and action name
     * @param {string} pageName
     * @param {string} actName
     * @returns {Object} page info
     */
    function getActionInfo(pageName, actName) {
        var page = getPage(pageName);

        if (page !== undefined) {
            return getAction(page, actName);
        }

        return undefined;
    }

    //Return public functions/properties
    return {getActionInfo: getActionInfo};
};

module.exports = TcPageInfo;