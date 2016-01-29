/**
 * Tallcat Admin View Helper
 * @param string bP
 * @returns ViewHelper
 */
var _ = require('underscore');
var swig = require('swig');
var util = require('util');
var TcUtil = require('../lib/tc-util.js');

module.exports = TcUtil.extend({}, _, {
    /**
     * Upper case first character of string
     * @param {String} str
     * @returns {String}
     */
    ucfirst: function(str) {
        if (!_.isEmpty(str)) {
            return str.charAt(0).toUpperCase() + str.substring(1);
        } else {
            return str;
        }
    },
    /**
     * P: function cutword
     * @param string $str to cut
     * @param int $length to cut
     * @return string
     */
    cutword: function(str, length) {
        if (str) {
            if (str.length > length) {
                str = str.substring(0, length);
                str += '...';
            }
        }

        return str;
    },
    /**
     * Encode media data as JSON
     * @argument {Array} media Media data
     * @argument {Boolean} in_queue Is in queue
     */
    encodeJSONStaffPickMedia: function(media, in_queue) {
        var dataString = JSON.stringify({mediaId: media['id'], mediaType: media['type'], staffPickType: media['staffPickType'], pos: media['pos'], in_queue: in_queue});
        return dataString;
    },
    /**
     * Encode media data as JSON
     * @argument {Array} media Media data
     * @argument {Boolean} in_queue Is in queue
     */
    encodeJSONMovementInspiredMedia: function(media, in_queue) {
        var dataString = JSON.stringify({mediaId: media['id'], mediaType: media['type'], in_queue: in_queue});
        return dataString;
    },
    /*
     * Print object keys/values
     * @argument {Object} obj Object to print
     */
    writeObject: function(obj) {
        return JSON.stringify(obj, null, 2);
    },
    /**
     * Get page breadcrumb path
     * @argument {string} path Original path
     * @argument {string} actName Action name
     * @argument {array} reqParams Request params
     * @argument {array} pageBreadcrumb PageBreadcrumb
     */
    getPageBreadcrumbPath: function(path, actName, reqParams, pageBreadcrumb) {
        var renderFromPageBreadcrumb = '';
        var actBreadcrumb = _.find(pageBreadcrumb, function(act) {
            return (act.id === actName);
        });

        if (actBreadcrumb === undefined) {
            renderFromPageBreadcrumb = swig.render(path, {locals: reqParams});
        } else {
            _.extend(actBreadcrumb.data, reqParams);
            renderFromPageBreadcrumb = swig.render(path, {locals: actBreadcrumb.data});
        }

        return renderFromPageBreadcrumb;
    }
});