
const constants  = require('./constants');

exports.parameterMissingResponse = parameterMissingResponse;
exports.actionCompleteResponse   = actionCompleteResponse;
exports.sendError                = sendError;

function actionCompleteResponse(res, data, msg, values) {
    let response = {
        message: msg || constants.responseMessages.ACTION_COMPLETE,
        status: constants.responseFlags.ACTION_COMPLETE,
        data: data || {}
    };
    if (values) {
        response.values = values;
    }
    res.send(JSON.stringify(response));
}

function parameterMissingResponse(res, err, data) {
    let response = {
        message: err || constants.responseMessages.PARAMETER_MISSING,
        status: constants.responseFlags.PARAMETER_MISSING,
        data: data || {}
    };
    res.send(JSON.stringify(response));
}

function sendError(res, data, message) {
    let response = {
        message: message || constants.responseMessages.ERROR_IN_EXECUTION,
        status: constants.responseFlags.ERROR_IN_EXECUTION,
        data: data || {}
    };
    res.send(JSON.stringify(response));
}