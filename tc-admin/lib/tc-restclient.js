/**
 * P: TcRestClient
 * @param string bP
 * @param object opts
 * @returns TcRestClient
 */
var _ = require('underscore');
var _s = require('underscore.string');
var Http = require('http');
var QueryString = require('querystring');
var Crypto = require('crypto');
var TcUtil = require('./tc-util.js');

var TcRestClient = function(bP, opts) {

    var basePath = bP;

    var afterRequest = null;

    var options = {
        'requestOptions': {
        },
        'headers': {
            'profile': "mobile-web",
            'version': 2,
            'deviceid': 'tc-admin'
        },
        'requestParams': {
            'data': {},
            'success': function(data) {
                TcUtil.log(data)
            },
            'error': function(e) {
                TcUtil.log(e)
            }
        }
    };

    var tempOpts = null;

    options = TcUtil.extend({}, options, opts);

    /**
     * Get request options
     * @returns {Array}
     */
    function getOptions() {
        return tempOpts;
    }

    /**
     * Set request header
     * @param {type} key
     * @param {type} val
     * @returns {undefined}
     */
    function setHeader(key, val) {
        options.headers[key] = val;
    }

    /**
     * Set callback function after request
     * @param {type} fn
     * @returns {undefined}
     */
    function setAfterRequest(fn) {
        afterRequest = fn;
    }


    /**
     * 
     * @param string path
     * @param object data
     * @param function cb
     * @returns {undefined}
     */
    function get(path, data, cb) {
        return doRequest('GET', path, data, cb);
    }

    /**
     * P: Create request use POST method
     * @param string path
     * @param object data
     * @param function cb
     * @returns {undefined}
     */
    function post(path, data, cb) {
        return doRequest('POST', path, data, cb);
    }

    /**
     * P: Create request use PUT method
     * @param string path
     * @param object data
     * @param function cb
     * @returns {undefined}
     */
    function put(path, data, cb) {
        return doRequest('PUT', path, data, cb);
    }


    /**
     * P: Create request use DELETE method
     * @argument {string} path
     * @argument {function} cb
     * @argument {object} data
     * @returns {undefined} 
     */
    function del(path, data, cb) {
        if (!_.isEmpty(data)) {
            var url = _s.strLeft(path, '?');
            var queryString = '';
            var pathInfo = _s.words(path, '?')

            if (pathInfo.length > 1) {
                queryString = pathInfo[1];
            }

            var dataString = QueryString.stringify(data);

            if (queryString !== null && queryString !== '') {
                dataString = queryString + '&' + dataString;
            }

            path = url + "?" + dataString;
        }

        return doRequest('DELETE', path, data, cb);
    }


    function prepareOptions(path) {
        path = path.split("/");
    }

    /**
     * Send request
     * @param {type} method
     * @param {type} path
     * @param array|string data
     * @param {type} cb
     * @param {type} try_count
     * @returns {undefined}
     */
    function doRequest(method, path, data, cb, try_count) {
        var org_path = path;
        if (cb) {
            options.requestParams.success = cb;
        }

        var params = TcUtil.extend({}, options.requestParams, {data: data});
        var param_data = params.data;
        var callback = params.success;
        var headers = options.headers;

        if (headers['Content-Type'] !== undefined) {
            delete headers['Content-Type'];
            delete headers['Content-Length'];
        }

        var dataString = _.isString(param_data) ? param_data : QueryString.stringify(param_data);

        if (params.token && params.token.length > 12) {
            headers.token = params.token;
        }

        if (method === 'GET') {
            path += (_s.include(path, '?') ? '&' : '?') + dataString;
        } else {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            headers['Content-Length'] = dataString.length;
        }

        var opts = {
            hostname: basePath,
            port: 80,
            path: path,
            method: method,
            headers: headers
        };

        // Use for display error if error occurs
        tempOpts = TcUtil.extend({}, opts, {dataString: dataString});

        console.log("Rest api header");
        console.log(opts);
        console.log({dataString: dataString});

        var starttime = (new Date()).getTime();

        var req = Http.request(opts, function(res) {
            var endtime = (new Date()).getTime();
            var ms = (endtime - starttime) / 1000;
            console.log('Call API taken ' + ms + ' seconds');
            res.setEncoding('utf-8');
            var str_data = '';

            res.on('data', function(chunk) {
                str_data += chunk;
            });

            res.on('end', function() {
                var jsonData = null;
                //console.log(str_data);
                try {
                    jsonData = JSON.parse(str_data);

                    if (typeof afterRequest === "function") {
                        afterRequest(jsonData);
                    }

                } catch (e) {
                    TcUtil.log("Error: API response data is not JSON");
                    TcUtil.log(str_data);
                    jsonData = null;

                    if (typeof(try_count) === 'undefined') {
                        try_count = 1;
                    }

                    if (try_count <= 2) {
                        doRequest(method, org_path, data, cb, try_count + 1);
                    }
                } finally {
                    if (jsonData === null && try_count > 2) {
                        if (str_data) {
                            callback(str_data);
                        } else {
                            callback(null);
                        }
                    } else if (jsonData !== null) {
                        callback(jsonData);
                    }
                }
            });
        });

        req.on('error', function(e) {
            params.error(e);
            console.log(e);
        });

        req.write(dataString);
        req.end();
    }

    //Return public function/properties
    return {
        get: get,
        post: post,
        put: put,
        del: del,
        getOptions: getOptions,
        setHeader: setHeader,
        setAfterRequest: setAfterRequest};
};

module.exports = TcRestClient;