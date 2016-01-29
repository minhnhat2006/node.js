var Constant = require('./../lib/Constants.js');
var Model = require("./Base");
var model = new Model();

var ChangeModel = model.extend({
    /**
     * Get Users list
     * @argument {type} data Data
     * @argument {type} callback Callback function
     */
    getChangeUsersList: function(data, callback) {
        var restClient = this.getRestClient();
        data.page_count = Constant.DEFAULT_PAGE_COUNT;
        restClient.get(Constant.API_PATH_CHANGE_LIST, data, callback);
    }
});

module.exports = ChangeModel;