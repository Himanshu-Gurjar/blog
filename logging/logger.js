
const moment = require('moment');

exports.log = log;
exports.logError = logError;

/**
 * prints the log in formated way on the terminal 
 * used for debugging perposes
 * 
 * @param {object} apiReference To log the data related to api from where the function get called.
 * @param {object/string} log log information which will be printed on terminal.
 */
function log(apiReference, log) {
    if (apiReference
        && apiReference.module
        && apiReference.api) {

        log = JSON.stringify(log);
        console.log("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
            apiReference.module + " :=: " + apiReference.api + " :=: " + log);
    }
}


/**
 * prints the error log in formated way on the terminal 
 * used for debugging perposes
 * 
 * @param {object} apiReference To log the data related to api from where the function get called.
 * @param {object/string} log error related imformation.
 */
function logError(apiReference, log) {
    if (apiReference
        && apiReference.module
        && apiReference.api) {
            
        log = JSON.stringify(log);
        console.error("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
    }
}
