var _ = require("underscore");
var _s = require('underscore.string');
var util = require('util');
var Constant = require('./../lib/Constants');
var TcPageBreadcrumb = require('./../lib/pageBreadcrumb');
var TcUtil = require('../lib/tc-util.js');
module.exports = {
    name: "base",
    controllerName: "index",
    actionName: "index",
    originalActionName: "index",
    title: "",
    viewTitle: "",
    viewDesc: "",
    viewBreadcrumbs: [],
    request: null,
    response: null,
    requestParams: {},
    model: null,
    view: null,
    eat: function(child) {
        return TcUtil.extend({}, TcUtil.clone(this), child);
    },
    /**
     * P: run controller 
     * @param obj req
     * @param obj res
     * @returns {undefined}
     */
    run: function(req, res) {
        //If dev
        console.log("\n\n\n\n");
        console.log("====================================================================================================");
        console.log('%s %s', req.method.toUpperCase(), req.originalUrl);
        console.log("====================================================================================================");
        //console.log(req.session);
        console.log("--------------- /end header -------------------");
        req = TcUtil.extend({}, this.request, req);
        this.request = req;
        this.response = res;
        if (!this.isLoggedin()) {
            return false;
        }

        this.parseUrl(this.request.originalUrl);
        this.initRequestParams(req);
        this.initBreadcrumbs();
        this.init();
        this.initBase();

        var atc = this.actionName + "Action";
        if (this[atc]) {
            var actionInfo = this.getPageInfo().getActionInfo(this.name, this.originalActionName);
            if (actionInfo) {
                this.setViewTitle(actionInfo.title[0]);
                this.setViewDesc(actionInfo.desc[0]);
                this.setViewBreadcrumbs(actionInfo);
            } else {
                this.setViewTitle('');
                this.setViewDesc('');
            }

            this[atc]();
        } else {
            throw "Invalid action " + this.actionName;
        }

        return true;
    },
    /**
     * P: Init the controller
     * @returns {undefined}
     */
    init: function() {
        console.log("Run init in base");
    },
    initBase: function() {
        if (!this.view) {
            this.request.session.destroy();
            this.redirect('/login');
        }

        if (this.request.session.userInfo) {
            this.view.userInfo = this.request.session.userInfo;
        }
    },
    /**
     * Initialize sokect.io routes for current workflow
     */
    initRoutes: function(app) {

    },
    /**
     * Check whether user logined
     * @returns {Boolean}
     */
    isLoggedin: function() {
        if (this.name !== 'login' && (!this.request.session || !this.request.session.isLoggedIn)) {
            this.redirect('/login');
            return false;
        }

        return true;
    },
    /**
     * Init actionName and controllerName
     * @param {type} originalUrl
     * @returns {unresolved}
     */
    parseUrl: function(originalUrl) {
        var org = originalUrl.split('?');
        if (org[0] === '' || org[0] === "/") {
            return;
        }

        var h = org[0].split('/');
        if (h[0] === "") {
            h.shift();
        }
        if (h[1] !== "" && h[1] !== undefined) {
            this.originalActionName = h[1];
            // Remove dash characters and upper case first character of each word in action name
            var names = this.originalActionName.split('-');
            if (names.length > 1) {
                for (var i = 1; i < names.length; i++) {
                    names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1);
                }

                this.actionName = names.join('');
            } else {
                this.actionName = this.originalActionName;
            }
        } else {
            this.actionName = 'index';
            this.originalActionName = 'index';
        }

        this.controllerName = h[0];
    },
    /**
     * Init request parameters
     * @param {type} req
     * @returns {undefined}
     */
    initRequestParams: function(req) {
        var org = _s.trim(_.unescape(req.originalUrl), '/ ');
        org = org.split('?');
        var params = {};
        if (org[0] !== '') {
            var urlParams = org[0].split('/');
            for (var i = 2; i < urlParams.length; i++) {
                var newParam = new Array();
                if (i + 1 < urlParams.length) {
                    newParam[urlParams[i]] = urlParams[i + 1];
                } else {
                    newParam[urlParams[i]] = '';
                }

                params = _.extend(params, newParam);
                i++;
            }
        }

        var query = TcUtil.extend(params, req.query);
        var body = TcUtil.extend(query, req.body);
        // Exclude param 0 from this.request.params
        if (!_.isUndefined(this.request.params[0])) {
            this.request.params.shift();
        }

        this.requestParams = TcUtil.extend({}, this.request.params, body);
    },
    /**
     * Init breadcrumbs and save to session
     * @returns {undefined}
     */
    initBreadcrumbs: function() {
        // Save to session
        var tcPageBreadcrumb = new TcPageBreadcrumb(this.request.session.pageBreadcrumb);
        tcPageBreadcrumb.setBreadcrumbKeyValue(this.name, this.originalActionName, this.requestParams);
        //Ex: ({id: this.name, act: [{id: this.originalActionName, data: keyValue}]}
        this.request.session.pageBreadcrumb = tcPageBreadcrumb.getBreadcrumbs();
        //console.log(util.inspect(this.request.session.pageBreadcrumb, false, null));
        this.request.session.save();
    },
    /**
     * Render view from by data
     * @param {type} data
     * @returns {undefined}      */
    render: function(data) {
        if (data === undefined) {
            data = {};
        }

        var pageBreadcrumbs = new TcPageBreadcrumb(this.request.session.pageBreadcrumb);
        var defaultRenderData = {
            API_HOST: global.config.api.host,
            STATIC_BASE: global.config.STATIC_BASE,
            token: this.request.session.token,
            user: this.request.session.user,
            orgTitle: this.title,
            title: this.viewTitle,
            desc: this.viewDesc,
            breadcrumbs: this.viewBreadcrumbs,
            pageBreadcrumb: pageBreadcrumbs.getBreadcrumb(this.name),
            controller: this.controllerName,
            action: this.originalActionName,
            flashmessage: _.has(this.request.session, 'flashmessage') ? this.request.session.flashmessage : '',
            userInfo: (this.view ? this.view.userInfo : {}),
            requestParams: this.getParams()
        };
        data = TcUtil.extend(defaultRenderData, data);
        this.view.attachViewHelper();
        this.view.render(data);
    },
    send: function(obj) {
        this.response.send(obj);
    },
    json: function(obj) {
        this.response.json(obj);
    },
    /**
     * P return controller name
     * @returns string
     */
    getControllerName: function() {
        return this.controllerName;
    },
    getRequest: function() {
        return this.request;
    },
    getResponse: function() {
        return this.response;
    },
    getParam: function(key, df) {
        if (df === undefined) {
            df = null;
        }
        if (this.requestParams[key] !== undefined && this.requestParams[key]) {
            return this.requestParams[key];
        } else {
            return df;
        }
    },
    /**
     * P: Get all request params
     * @returns {unresolved}
     */
    getParams: function() {
        return this.requestParams;
    },
    redirect: function(url) {
        console.log("Run redirect: %s", url);
        this.isRedirect = true;
        this.response.redirect(url);
    },
    redirectClientSide: function(url) {
        console.log("Run redirect: %s", url);
        this.send('<meta http-equiv="refresh" content="0; url=' + url + '" />');
    },
    setModel: function(model) {
        this.model = model;
    },
    setView: function(view) {
        this.view = view;
    },
    setViewTitle: function(title) {
        this.title = title;
        this.viewTitle = title + Constant.PAGE_TITLE_POSTFIX;
    }, setViewDesc: function(desc) {
        this.viewDesc = desc;
    },
    generateBreadcrumbs: function(actionInfo) {
        var breadcrumbs = [];
        if (actionInfo.prev[0] !== '') {
            var prevActionInfo = this.getPageInfo().getActionInfo(this.name, actionInfo.prev[0]);
            breadcrumbs = this.generateBreadcrumbs(prevActionInfo);
        }

        breadcrumbs.push({id: actionInfo['$'].id, path: actionInfo.path[0], title: actionInfo.title[0]});
        return breadcrumbs;
    },
    setViewBreadcrumbs: function(actionInfo) {
        this.viewBreadcrumbs = this.generateBreadcrumbs(actionInfo);
    },
    getRestClient: function() {
        tcRestClient = this.getRequest().tcRestClient;
        if (this.request.session.user) {
            tcRestClient.setHeader('user', this.request.session.user);
        }
        if (this.request.session.token) {
            tcRestClient.setHeader('token', this.request.session.token);
        }
        if (this.request.session.sessionid) {
            tcRestClient.setHeader('Cookie', "__tcsess=" + this.request.session.sessionid);
        }

        return tcRestClient;
    },
    getPageInfo: function() {
        return this.getRequest().tcPageInfo;
    },
    /**
     * Genrate pagination data
     * @param {type} data
     * @param {type} itemCount
     * @param {type} limit
     * @param {type} pageRange
     * @param {type} current
     * @returns {undefined}
     */
    genPaginationData: function(data, itemCount, limit, pageRange, current, opts) {
        if (!opts) {
            opts = {};
        }
        opts.path = "/" + this.name + "/" + this.originalActionName;
        return this.model.genPaginationData(this.getParams(), data, itemCount, limit, pageRange, current, opts);
    },
    /**
     * Check whether user logined
     * @argument {response} resData response data
     * @returns {Boolean}
     */
    validateRestData: function(resData) {
        if (this.response.finished) {
            return false;
        }

        var errCodeLogins = ['E0005'];

        if (resData === null) {
            this.request.session.errorData = {error: 'API returned empty value. Please check admin API.', params: this.getRestClient().getOptions()};
            this.request.session.save();
            this.redirect('/err');
            return false;
        }

        if (resData.error === undefined) {
            this.request.session.errorData = {error: resData, params: this.getRestClient().getOptions()};
            this.request.session.save();
            this.redirect('/err');
            return false;
        }

        if (resData.error === true && errCodeLogins.indexOf(resData.code) >= 0) {
            this.request.session.isLoggedIn = false;
            this.request.session.save();
            this.redirect('/login');
            return false;
        }

        return true;
    },
    /**
     * Check whether or not response data contains all fields
     * @param {type} resData
     * @param {array} fields
     * @returns {undefined}
     */
    validateRestDataFields: function(resData, fields) {
        if (fields === undefined || !fields || !(fields instanceof Array)) {
            return;
        }

        for (var i = 0; i < fields.length; i++) {
            if (resData[fields[i]] === undefined || !resData[fields[i]]) {
                this.redirectToErrPage(resData);
                return false;
            }
        }

        return true;
    },
    /**
     * Redirect to err page and show err data
     * @param {type} errData
     * @returns {undefined}
     */
    redirectToErrPage: function(errData) {
        this.request.session.errorData = {error: errData, params: this.getRestClient().getOptions()};
        this.request.session.save();
        this.redirect('/err');
    }
};