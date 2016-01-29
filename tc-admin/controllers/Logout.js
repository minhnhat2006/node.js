var BaseController = require("./Base");
module.exports = BaseController.eat({
    
    indexAction : function () {
        delete this.request.session.isLoggedIn;
        delete this.request.session.user;
        delete this.request.session.userInfo;
        delete this.request.session.token;
        this.redirect("/login");
    }
});