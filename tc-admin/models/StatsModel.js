var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var StatsModel = model.extend({
    /**
     * Get common stat
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getCommonStat: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_COMMON_STAT, data, callback);
    },
    /**
     * Get content upload by day
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getContentUploadByday: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_GET_CONTENT_UPLOAD_BY_DAY, data, callback);
    },
    /**
     * Get most viewed portal
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getMostViewedPortal: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_MOST_VIEWED_PORTAL, data, callback);
    },
    /**
     * Get top embracing
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getTopEmbracing: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_TOP_EMBRACING, data, callback);
    },
    /**
     * Get top embraces
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getTopEmbrace: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_TOP_EMBRACE, data, callback);
    },
    /**
     * Get top used tags
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getTopUsedTags: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_STAT_TOP_USED_TAGS, data, callback);
    },
    /**
     * Get top creativ categories
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getTopCreativCategories: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_STAT_TOP_CREATIV_CATEGORIES, data, callback);
    },
    /**
     * Get highest viewed media content
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getHighestViewMediaContent: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_HIGHEST_VIEW_MEDIA, data, callback);
    },
    /**
     * Get highest comment media content
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getHighestCommentMediaContent: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_HIGHEST_COMMENT_MEDIA, data, callback);
    },
    /**
     * Get highest inspire media
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getHighestInspireMediaContent: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_HIGHEST_INSPIRE_MEDIA, data, callback);
    },
    /**
     * Get beanstalkd stat
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getBeanstalkdStat: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_BEANSTALKD_STAT, data, callback);
    },
    /**
     * Get beanstalkd stat
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getBeanstalkdStatFailed: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_BEANSTALKD_STAT_FAILED, data, callback);
    },
    /**
     * Get registration
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getRegistration: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_REG, data, callback);
    },
    /**
     * Get registration by hours
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getRegistrationByHour: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_REG_HOUR, data, callback);
    },
    /**
     * Get daily registration statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayRegistration: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_REG, data, callback);
    },
    /**
     * Get daily registration statistic by type
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayRegistrationByType: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_REG_BY_TYPE, data, callback);
    },
    /**
     * Get daily login statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayLogin: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_LOGIN, data, callback);
    },
    /**
     * Get daily page view statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayPageView: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_PAGE_VIEW, data, callback);
    },
    /**
     * Get daily embracing statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayEmbrace: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_EMBRACE, data, callback);
    },
    /**
     * Get daily inspiring statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayInspire: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_INSPIRE, data, callback);
    },
    /**
     * Get daily commenting statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayComment: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_COMMENT, data, callback);
    },
    /**
     * Get daily content uploaded statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalDayContentUploaded: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_DAY_CONTENT_UPLOADED, data, callback);
    },
    /**
     * Get monthly registration statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthRegistration: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_REG, data, callback);
    },
    /**
     * Get monthly registration statistic by type
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthRegistrationByType: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_REG_BY_TYPE, data, callback);
    },
    /**
     * Get monthly login statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthLogin: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_LOGIN, data, callback);
    },
    /**
     * Get monthly page view statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthPageView: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_PAGE_VIEW, data, callback);
    },
    /**
     * Get monthly embracing statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthEmbrace: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_EMBRACE, data, callback);
    },
    /**
     * Get monthly inspiring statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthInspire: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_INSPIRE, data, callback);
    },
    /**
     * Get monthly commenting statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getIntervalMonthComment: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_STAT_INTERVAL_MONTH_COMMENT, data, callback);
    },
    /**
     * Get daily content uploaded statistic
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    inspireMedia: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.post(Constant.API_PATH_STAT_INSPIRE_MEDIA, data, callback);
    }
});

module.exports = StatsModel;