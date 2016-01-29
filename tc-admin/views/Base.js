module.exports = function(response, template) {
    this.response = response;
    this.template = template;
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
    /**
     * Render view from template and data
     * @param {type} data
     * @returns {undefined}
     */
    render: function(data) {
        if (this.response && this.template) {
            if (this.isAttatchViewHelper === true) {
                //Attatch ViewHelper to data
                if (!data) {
                    data = {};
                }

                data.helper = require('./ViewHelper');
            }

            this.response.render(this.template, data);
        }
    },
    /**
     * Attatch ViewHelper object to render data
     * @returns {undefined}
     */
    attachViewHelper: function() {
        this.isAttatchViewHelper = true;
    }
};