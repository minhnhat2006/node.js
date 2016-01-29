var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var BlogModel = model.extend({
    /**
     * Get Blogs list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getBlogsList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_BLOG_LIST, data, callback);
    },
    /**
     * Get detail data of blog
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getBlogDetail: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_BLOG_DETAIL, data, callback);
    },
    /**
     * Delete a Blog
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    deleteBlog: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.del(Constant.API_PATH_BLOG_DELETE, data, callback);
    },
    /**
     * Update a Blog
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    updateBlog: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.put(Constant.API_PATH_BLOG_UPDATE, data, callback);
    },
    /**
     * Search the blogs
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    searchBlog: function(data, callback) {
        var restClient = this.getRestClient();
        restClient.get(Constant.API_PATH_BLOG_SEARCH, data, callback);
    }
});

module.exports = BlogModel;