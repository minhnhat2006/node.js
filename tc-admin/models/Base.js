var _ = require("underscore");
var mathjs = require('mathjs');
var math = mathjs();

module.exports = function(tcRestClient) {
    this.tcRestClient = tcRestClient;
};
module.exports.prototype = {
    extend: function(properties) {
        var Child = module.exports;
        Child.prototype = module.exports.prototype;

        for (var key in properties) {
            Child.prototype[key] = properties[key];
        }

        return Child;
    },
    setRestClient: function(tcRestClient) {
        this.tcRestClient = tcRestClient;
    },
    getRestClient: function() {
        return this.tcRestClient;
    },
    /**
     * Genrate pagination data
     * @param {type} reqParams
     * @param {type} data
     * @param {type} itemCount
     * @param {type} limit
     * @param {type} pageRange
     * @param {type} current
     * @param {type} opts
     * @returns {module.exports.prototype.genPaginationData.page}
     */
    genPaginationData: function(reqParams, data, itemCount, limit, pageRange, current, opts) {
        var pageCount = math.ceil(itemCount / limit);

        if (!current) {
            current = 1;
        } else if (current > pageCount) {
            current = pageCount;
        }

        var from = 0;
        var to = 0;
        var previous = 0;
        var next = 0;

        if (pageRange >= pageCount) {
            from = 1;
            to = pageCount;

            if (current > 1) {
                previous = current - 1;
            }

            if (current < to) {
                next = current + 1;
            }
        } else {
            from = current;

            to = current + pageRange - 1;
            if (to > pageCount) {
                to = pageCount;
            }

            if (current > 1) {
                previous = current - 1;
            }

            if (current < to) {
                next = current + 1;
            }
        }

        var pagesInRange = new Array();

        for (var i = from; i <= to; i++) {
            pagesInRange.push({index: i, url: this.getPageUrl(reqParams, i, opts)});
        }

        var page = {
            current: current,
            rowTotal: itemCount,
            pageCount: pageCount,
            previous: previous,
            prev_url: previous ? this.getPageUrl(reqParams, previous, opts) : '',
            next: next,
            next_url: next ? this.getPageUrl(reqParams, next, opts) : '',
            pagesInRange: pagesInRange,
            data: data
        };

        return page;
    },
    /**
     * Generate url from request parameters and current page index
     * @param {type} reqParams
     * @param {type} page
     * @returns {String}
     */
    getPageUrl: function(reqParams, page, opts) {
        var url = "";
        var pageArr = new Array();

        if (opts && _.has(opts, 'page')) {
            pageArr[opts.page] = page;
        } else {
            pageArr['page'] = page;
        }
        reqParams = _.extend(reqParams, pageArr);

        for (var param_name in reqParams) {
            url += ("/" + param_name + "/" + reqParams[param_name]);
        }

        if (opts && _.has(opts, 'path')) {
            url = opts.path + url;
        }

        return url;
    }
};