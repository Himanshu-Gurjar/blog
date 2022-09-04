const Responses = require("../utils/responses");
const constants = require("../utils/constants");
const _         = require("underscore");
const logger    = require("../logging/loggerConfig").logger;
const responses = new Responses();

exports.isFieldsAreValid = isFieldsAreValid;

function isFieldsAreValid(apiReference, object, res, schema) {
    if(_.isEmpty(object)) {
        logger.error(apiReference, "Blank Object passed");
        responses.parameterMissingResponse(res);
        return false;
    }
    let validation = schema.validate(object)
    if (validation.error) {
        let errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : "Parameter missing or parameter type is wrong";

        logger.error(apiReference, validation.error.details);
        responses.validationError(res, errorReason);
        return false;
    }
    return true;
}