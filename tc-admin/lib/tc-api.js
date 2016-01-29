var http = require('http')
var querystring = require('querystring')
var util = require('util')
var crypto = require('crypto')
var TcUtil = require('./tc-util.js')

var TcApi = function(endPoint, isDebug) {
    var basePath = endPoint,
            debug = isDebug


    function getUserInfo(userId, token, cb) {
        request('/user', 'GET', {a: 'get_info', who: userId, token: token}, function(result, data) {
            if (isFunction(cb))
                cb(result, data)
        })
    }

    function getFriends(userId, token, cb) {
        doApiRequest('/creativ-network/', 'GET', {}, function(data) {
            console.log("CREATIV NETWORK: " + util.inspect(data))
        })
    }

    function auth(uname, pass, cb) {
        console.log(uname);
        console.log("yes, this line")
        doApiRequest('/admin/auth', 'POST', {user: uname, pw: crypto.createHash('md5').update(pass).digest("hex")}, function(data) {
            var result = true
            if (data.error) {
                result = false
                console.log("Error authing with the API.")
                if (isFunction(cb))
                    cb(result, {token: null, userId: null})
            } else {
                console.log("User " + data.auth.id.toString() + " authed with token " + data.auth.token)
                if (isFunction(cb))
                    cb(result, {token: data.auth.token, userId: data.auth.id})
            }
        })
    }

    function request(path, method, data, cb) {
        doApiRequest(path, method, data, function(data) {
            if (data.error && isFunction(cb)) {
                cb(false, data)
            } else {
                if (cb && isFunction(cb))
                    cb(true, data)
            }
        })
    }

    function doApiRequest(path, method, data, cb) {
        var headers = {
            deviceid: "TC-ADMIN-01",
            profile: "mobile",
            version: "tcapp 1.0"
        },
        //dataString = JSON.stringify(data)
        dataString = querystring.stringify(data)

        if (data.token && data.token.length > 12)
            headers.token = data.token
        if (data.userId && method == 'POST')
            headers.user = data.userId

        if (method == 'GET') {
            path += '?' + dataString
        } else {
            headers['Content-Type'] = 'application/x-www-form-urlencoded'
            headers['Content-Length'] = dataString.length
        }

        var options = {
            hostname: basePath,
            port: 80,
            path: path,
            method: method,
            headers: headers
        }
        var req = http.request(options, function(res) {
            res.setEncoding('utf-8')
            var data = ''


            res.on('data', function(chunk) {
                data += chunk
            })

            res.on('end', function() {
                var jsonData = null
                try {
                    jsonData = JSON.parse(data)
                } catch (e) {
                    jsonData = data
                } finally {

                    cb(jsonData || data)
                }
            })
        })

        req.on('error', function(e) {
            console.log('*** problem with request: ' + e.message)
        })

        req.write(dataString)
        req.end()
    }

    function isFunction(func) {
        return typeof(func) === 'function';
    }

    return {auth: auth, getUserInfo: getUserInfo}
}
module.exports = TcApi;