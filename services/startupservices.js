const apiReferenceModule = "startup";
const Promise            = require("bluebird");
const config             = require("config");
const Mongoose           = require("mongoose");
const logger             = require("../logging/loggerConfig").logger;
const http               = require("http");


exports.initializeServer = initializeServer;
/**
 * Creates Http server on given port
 * 
 * @param {number} port The port on which server will listen.
 */
function startHttpServer(port, app) {
    return new Promise((resolve, reject) => {
        let apiReference = {
            module : apiReferenceModule, 
            api : "start_http_server"
        }
        http.createServer(app).listen(port, function () {
            logger.info(apiReference, {EVENT : `STARTING HTTP SERVER ON PORT ${port}`});
            resolve();
        });
    });
}

/**
 * Initialize database connection and http server
 */
function initializeServer(app) {
    return new Promise((resolve, reject) => {
        let apiReference = {
            module: apiReferenceModule,
            api: "initialize"
        };
        Promise.coroutine(function* () {
            let connectionConfig = config.get("databaseSettings.mongo_db_connection");
            yield initializeConnection(connectionConfig, apiReference);
            let port = process.env.PORT || config.get("PORT");
            yield startHttpServer(port, app);
        })().then((data) => {
            initializeLogger()
            resolve(data);
        }, (error) => {
            logger.error(apiReference, error);
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
                logger.error(apiReference, {EVENT : "MONGOOSE CONNECTION ERROR", ERROR : err});
                reject(err)
            }
            logger.info(apiReference, {EVENT : "MONGOOSE CONNECTED SUCCESSFULLY"});
            resolve(database)
        })
    });
}


function initializeLogger() {
    if (process.env.NODE_ENV === "live") {
        logger.level = "error" // if environment is live then log only errors otherwise all logs will be logged
    }
}