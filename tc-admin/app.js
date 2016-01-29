var express = require('express.io');
var index = require('./index.js');
var cluster = require('cluster');
var cores = require('os').cpus().length;

var param = {port: global.config.port, debug: true, apiEndpoint: global.config.api.host},
port, host, debug;

process.argv.forEach(function(val, index, array) {
    if (val === '-p' && array[index + 1] && (port = parseInt(array[index + 1]))) {
        param.port = port;
    } else if (val === '-h' && array[index + 1] && (host = parseInt(array[index + 1]))) {
        param.apiEndpoint = host;
    } else if (val === '-d' && array[index + 1]) {
        param.debug = true;
    }
});

/*cluster.on('online', function(worker) {
 console.log('Worker ' + worker.process.pid + ' is online.');
 });
 cluster.on('exit', function(worker, code, signal) {
 console.log('worker ' + worker.process.pid + ' died.');
 });*/

// fork if master pid
if (!cluster.isMaster) {
    index.bootstrap(express().http().io(), param);
} else {
    for (var i = 0; i < cores; i++) {
        cluster.fork();
    }
}
