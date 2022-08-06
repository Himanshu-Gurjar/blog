
const constants  = require('./constants');

exports.parameterMissingResponse = parameterMissingResponse;
exports.actionCompleteResponse   = actionCompleteResponse;
exports.sendError                = sendError;
exports.internalErrorMessage     = internalErrorMessage;

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
        message: message || constants.responseMessages.ERROR,
        status: constants.responseFlags.ERROR,
        data: data || {}
    };
    res.send(JSON.stringify(response));
}

function internalErrorMessage(res) {
    var response = {
      message: constants.responseMessages.INTERNAL_SERVER_ERROR,
      status : constants.responseFlags.INTERNAL_SERVER_ERROR,
      data   : {}
    };
    res.send(JSON.stringify(response));
  }