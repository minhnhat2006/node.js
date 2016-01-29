global.config = require('/etc/tallcat/server.admin.js');

var express = require('express.io');
var redis = require('redis');
var RedisStore = require('connect-redis')(express);
var consolidate = require('consolidate');
var swig = require('swig');
var path = require('path');
var util = require('util');

var Constant = require('./lib/Constants');
var TcPageInfo = require('./lib/pageInfo');
var TcRestClient = require('./lib/tc-restclient');
var redisOpts = {host: global.config.redis.host, port: global.config.redis.port};

var IORoute = require('./controllers/IORoute');
var Login = require('./controllers/Login');
var Home = require('./controllers/Index');
var Approval = require('./controllers/Approval');
var MassMailer = require('./controllers/MassMailer');
var Blog = require('./controllers/Blog');
var Console = require('./controllers/Console');
var Change = require('./controllers/Change');
var Comment = require('./controllers/Comment');
var FilterBuilder = require('./controllers/FilterBuilder');
var FlagQueue = require('./controllers/FlagQueue');
var StaffPick = require('./controllers/StaffPick');
var GraphBuilder = require('./controllers/GraphBuilder');
var Viral = require('./controllers/Viral');
var User = require('./controllers/User');
var Stats = require('./controllers/Stats');
var Media = require('./controllers/Media');
var Error = require('./controllers/Error');
var Collection = require('./controllers/Collection');
var Report = require('./controllers/Report');
var Notifications = require('./controllers/Notifications');
var FlagMessage = require('./controllers/FlagMessage');
var GatheringManager = require('./controllers/GatheringManager');
var GatheringReported = require('./controllers/GatheringReported');
var CreativeMovement = require('./controllers/CreativeMovement');
var Magazine = require('./controllers/Magazine');

var swigCssTag = require('./lib/swig-css-tag');
var swigJsTag = require('./lib/swig-js-tag');
var swigIconTag = require('./lib/swig-icon-tag');

exports.bootstrap = function(app, param) {
    app.configure(function() {
        app.set('view engine', 'html');
        app.engine('html', consolidate.swig);
        app.set('views', __dirname + '/templates');
        swig.setTag('css', swigCssTag.parse, swigCssTag.compile, swigCssTag.ends, swigCssTag.blockLevel);
        swig.setTag('js', swigJsTag.parse, swigJsTag.compile, swigJsTag.ends, swigJsTag.blockLevel);
        swig.setTag('icon', swigIconTag.parse, swigIconTag.compile, swigIconTag.ends, swigIconTag.blockLevel);

        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('tc-admin-worker'));
        app.use(express.session({
            secret: 'f093284fs91(*234pos0)(!%_',
            store: new RedisStore({
                client: redis.createClient(global.config.redis.port, global.config.redis.host)
            })
        }));
        app.use(app.router);
        app.use(express.static(__dirname + "/assets"));

        app.io.set('store', new express.io.RedisStore({
            redisPub: redisOpts,
            redisSub: redisOpts,
            redisClient: redisOpts
        }));
    });

    app.configure('development', function() {
        console.log("*** DEV MODE ***\n");
        app.set("apiEndpoint", "local-api.tallcat.com");
        app.set("debug", true);
        app.use(express.errorHandler({showStack: true, dumpExceptions: true}));
        app.set('view cache', false);
        // Disables caching in Swig.
        swig.setDefaults({cache: false});
    });

    app.configure('production', function() {
        app.set("apiEndpoint", "api.tallcat.me");
        console.log("*** PRODUCTION MODE ***");
        app.set("debug", true);
        app.use(express.errorHandler({showStack: true, dumpExceptions: true}));
        app.set('view cache', false);
        // Enables caching in Swig.
        swig.setDefaults({cache: "memory"});
    });

    var tcPageInfo = new TcPageInfo(__dirname + '/resources/pageInfo.xml', {});
    app.set('tcPageInfo', tcPageInfo);

    var tcRestClient = new TcRestClient(global.config.api.host, {});
    app.set('tcRestClient', tcRestClient);

    app.use(function(req, res, next) {
        var err = req.session.error;
        var msg = req.session.success;
        delete req.session.error;
        delete req.session.success;
        res.locals.message = '';

        if (err) {
            res.locals.message = '<p class="msg error">' + err + '</p>';
        }
        if (msg) {
            res.locals.message = '<p class="msg success">' + msg + '</p>';
        }

        next();
    });

    /**
     * Catch uncaught Exception
     */
    process.on('uncaughtException', function(err) {
        console.log(new Date());
        console.log('Caught exception: ');
        console.log(err);
    });

    /*
     * Initialize IO routes/events
     */
    IORoute.initRoutes(app);

    var attatchParams = function(req, res, next) {
        req.tcRestClient = tcRestClient;
        req.tcPageInfo = tcPageInfo;
        next();
    };

    app.all('/login', attatchParams, function(req, res) {
        Login.run(req, res);
    });
    app.all('/approval*', attatchParams, function(req, res) {
        Approval.run(req, res);
    });
    app.all('/mass-mailer*', attatchParams, function(req, res) {
        MassMailer.run(req, res);
    });
    app.all('/blog*', attatchParams, function(req, res) {
        Blog.run(req, res);
    });
    app.all('/console*', attatchParams, function(req, res) {
        Console.run(req, res);
    });
    app.all('/change*', attatchParams, function(req, res) {
        Change.run(req, res);
    });
    app.all('/comment*', attatchParams, function(req, res) {
        Comment.run(req, res);
    });
    app.all('/filter-builder*', attatchParams, function(req, res) {
        FilterBuilder.run(req, res);
    });
    app.all('/flag-queue*', attatchParams, function(req, res) {
        FlagQueue.run(req, res);
    });
    app.all('/staff-pick*', attatchParams, function(req, res) {
        StaffPick.run(req, res);
    });
    app.all('/graph-builder*', attatchParams, function(req, res) {
        GraphBuilder.run(req, res);
    });
    app.all('/viral*', attatchParams, function(req, res) {
        Viral.run(req, res);
    });
    app.all('/user*', attatchParams, function(req, res) {
        User.run(req, res);
    });
    app.all('/stats*', attatchParams, function(req, res) {
        Stats.run(req, res);
    });
    app.all('/media*', attatchParams, function(req, res) {
        Media.run(req, res);
    });
    app.all('/err', attatchParams, function(req, res) {
        Error.run(req, res);
    });
    app.all('/collection*', attatchParams, function(req, res) {
        Collection.run(req, res);
    });
    app.all('/report*', attatchParams, function(req, res) {
        Report.run(req, res);
    });
    app.all('/Notifications*', attatchParams, function(req, res) {
        Notifications.run(req, res);
    });
    app.all('/flag-message*', attatchParams, function(req, res) {
        FlagMessage.run(req, res);
    });
    app.all('/gathering-manager*', attatchParams, function(req, res) {
        GatheringManager.run(req, res);
    });
    app.all('/gathering-reported*', attatchParams, function(req, res) {
        GatheringReported.run(req, res);
    });
    app.all('/creative-movement*', attatchParams, function(req, res) {
        CreativeMovement.run(req, res);
    });
    app.all('/magazine*', attatchParams, function(req, res) {
        Magazine.run(req, res);
    });
    app.all('/', attatchParams, function(req, res) {
        Home.run(req, res);
    });
    app.listen(global.config.port, function() {
        console.log('Server listening on port ' + global.config.port);
    });

    return app;
};


