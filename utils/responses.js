
const constants  = require("./constants");
module.exports = class Responses {

    getResponse(message, status, data) {
        return {message : message, status : status, data : data || {}}
    }

    actionCompleteResponse(res, data, mgs, values) {
        this.response = this.getResponse(mgs || constants.responseMessages.ACTION_COMPLETE, 
                                                constants.responseFlags.ACTION_COMPLETE, data);
        if (values) {
            this.response.values = values;
        }
        res.send(JSON.stringify(this.response));
    }

    parameterMissingResponse(res, err, data) {
        this.response = this.getResponse(err || constants.responseMessages.PARAMETER_MISSING, 
                                                constants.responseFlags.PARAMETER_MISSING, data);
        res.send(JSON.stringify(this.response));
    }

    noDataFound(res, message) {
        this.response = this.getResponse(message ||constants.responseMessages.NO_DATA_FOUND, 
                                                   constants.responseFlags.NO_DATA_FOUND);
        res.send(JSON.stringify(this.response));
    }

    sendError(res, message) {
        this.response = this.getResponse(message || constants.responseMessages.BAD_REQUEST,
                                                    constants.responseFlags.BAD_REQUEST);
    
        res.send(JSON.stringify(this.response));
    }

    validationError(res, err) {
        this.response = this.getResponse(err || constants.responseMessages.VALIDATION_ERROR,
                                                    constants.responseFlags.VALIDATION_ERROR);
        
        res.send(JSON.stringify(this.response));
    }

    unauthorizedError(res, err) {
        this.response = this.getResponse(err || constants.responseMessages.UNAUTHORIZED,
                                                constants.responseFlags.UNAUTHORIZED);

        res.send(JSON.stringify(this.response));
    }

    internalErrorMessage(res) {
        this.response = this.getResponse(constants.responseMessages.INTERNAL_SERVER_ERROR, constants.responseFlags.INTERNAL_SERVER_ERROR)
        
        res.send(JSON.stringify(this.response));
    }
}
