const apiReferenceModule    = 'blogPostValidator';
const logging               = require('../logging/logger');
const responses             = require('../utils/responses');
const Joi                   = require('joi');
const _                     = require('underscore');
const utils                 = require('../utils/utils')

exports.validateBlogDetails = validateBlogDetails;
exports.IdValidatorQuery    = IdValidatorQuery;
exports.ValidateUpdateBlog  = ValidateUpdateBlog;
exports.IdValidatorParams   = IdValidatorParams;

function validateFields(apiReference, object, res, schema) {
    if(_.isEmpty(object)) {
        logging.logError(apiReference, "Blank Object passed");
        responses.parameterMissingResponse(res);
        return false;
    }
    let validation = schema.validate(object)
    if (validation.error) {
        let errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';

        logging.logError(apiReference, validation.error.details);
        responses.parameterMissingResponse(res, errorReason);
        return false;
    }
    return true;
}


function validateBlogDetails(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "validate_blog_details"
    };

    let schema = Joi.object({
        title       : Joi.string().required(),
        content     : Joi.string().required(),
        description : Joi.string().optional()
    })
    console.log("req=============", req.body, req);
    if (validateFields(apiReference, req.body, res, schema)) next();

}

function IdValidatorQuery(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "id_validator_for_query"
    };

    let schema = Joi.object({
        id: Joi.string().required()
    })

    if (validateFields(apiReference, req.query, res, schema)) next();
}

function IdValidatorParams(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "id_validator_for_params"
    };

    let schema = Joi.object({
        id: Joi.string().required()
    })

    if (validateFields(apiReference, req.params, res, schema)) next();
}

function ValidateUpdateBlog(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "ValidateUpdateBlog"
    };
    if (utils.checkBlankField([req.body.id, req.body.title, req.body.content])) {
        return responses.parameterMissingResponse(res);
    }
    next();

}