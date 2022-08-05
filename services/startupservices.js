const apiReferenceModule = 'startup';
const Promise            = require('bluebird');
const config             = require('config');
const MongoClient        = require('mongodb').MongoClient;
const logging            = require('../logging/logger');
const http               = require('http');


exports.initializeServer = initializeServer;

function startHttpServer(port) {
    return new Promise((resolve, reject) => {
        var server = http.createServer(app).listen(port, function () {
            console.log(`################## Express connected on port ${port} ##################`);
            resolve(server);
        });
    });
}

function initializeServer() {
    return new Promise((resolve, reject) => {
        let apiReference = {
            module: apiReferenceModule,
            api: "initialize"
        };
        Promise.coroutine(function* () {
            let connectionConfig = config.get('databaseSettings.mongo_db_connection');
            db = yield initializeConnection(connectionConfig);
            let port = process.env.PORT || config.get('PORT');
            yield startHttpServer(port);

        })().then((data) => {
            resolve(data);
        }, (error) => {
            logging.logError(apiReference, error);
            reject(error);
        });
    })
}

function initializeConnection(connectionConfig) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(connectionConfig, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, database) {
        if (err) {
            console.error('Mongo connection error', err);
            return reject(err);
          }
          console.error("################## Mongo Connected ##################");
          return resolve(database);
      });
    });
}