const apiReferenceModule = 'startup';
const Promise            = require('bluebird');
const config             = require('config');
const Mongoose           = require('mongoose');
const logging            = require('../logging/loggerConfig').logger;
const http               = require('http');


exports.initializeServer = initializeServer;
/**
 * Creates Http server on given port
 * 
 * @param {number} port The port on which server will listen.
 */
function startHttpServer(port) {
    return new Promise((resolve, reject) => {
        let apiReference = {
            module : apiReferenceModule, 
            api : "start_http_server"
        }
        http.createServer(app).listen(port, function () {
            logging.info(apiReference, {EVENT : `STARTING HTTP SERVER ON PORT ${port}`});
            resolve();
        });
    });
}

/**
 * Initialize database connection and http server
 */
function initializeServer() {
    return new Promise((resolve, reject) => {
        let apiReference = {
            module: apiReferenceModule,
            api: "initialize"
        };
        Promise.coroutine(function* () {
            let connectionConfig = config.get('databaseSettings.mongo_db_connection');
            yield initializeConnection(connectionConfig, apiReference);
            let port = process.env.PORT || config.get('PORT');
            yield startHttpServer(port);
        })().then((data) => {
            resolve(data);
        }, (error) => {
            logging.error(apiReference, error);
            reject(error);
        });
    })
}

/**
 * Creates mongoose connection for given mongodb url
 * 
 * @param {string} connectionConfig The url of mongodb on which connection will be created.
 * @param {object} apiReference To log the data related to api from where the function get called.
 */
function initializeConnection(connectionConfig, apiReference) {
    return new Promise((resolve, reject) => {
        Mongoose.connect(connectionConfig, {useNewUrlParser : true, useUnifiedTopology : true}, function(err, database) {
            if(err) {
                logging.error(apiReference, {EVENT : "MONGOOSE CONNECTION ERROR", ERROR : err});
                reject(err)
            }
            logging.info(apiReference, {EVENT : "MONGOOSE CONNECTED SUCCESSFULLY"});
            resolve(database)
        })
    });
}
