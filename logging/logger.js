
const moment = require('moment');

exports.log = log;
exports.logError = logError;


function log(apiReference, log) {
    if (apiReference
        && apiReference.module
        && apiReference.api) {

        log = JSON.stringify(log);
        console.log("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
            apiReference.module + " :=: " + apiReference.api + " :=: " + log);
    }
}


function logError(apiReference, log) {
    if (apiReference
        && apiReference.module
        && apiReference.api) {
            
        log = JSON.stringify(log);
        console.error("-->" + apiReference.module + " :=: " + apiReference.api + " :=: " + log);
    }
}
