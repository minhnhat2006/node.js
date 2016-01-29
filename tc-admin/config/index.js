var config = {
    local: {
        mode: 'local',
        port: 30000,
        redis: {host: '127.0.0.1', port: 6379},
        api: {host: 'local-api.tallcat.com'},
        STATIC_BASE: 'http://local-static.tallcat.com'
    },
    staging: {
        mode: 'staging',
        port: 40000,
        redis: {host: '10.72.89.135', port: 6379},
        api: {host: 'api.creativ.com'},
        STATIC_BASE: 'http://static.tallcatqa.com'
    },
    production: {
        mode: 'production',
        port: 50000,
        redis: {host: '127.0.0.1', port: 6379},
        api: {host: 'api.tallcat.me'},
        STATIC_BASE: 'http://static.tallcatqa.com'
    }
}
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}