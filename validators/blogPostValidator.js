const apiReferenceModule    = 'blogPostValidator';
const logging               = require('../logging/logger');
const responses             = require('../utils/responses');
const Joi                   = require('joi');
const _                     = require('underscore');
const moment                = require('moment')
const utils                 = require('../utils/utils')

exports.validateBlogDetails     = validateBlogDetails;
exports.getAllBlogsValidator    = getAllBlogsValidator
exports.IdValidatorQuery        = IdValidatorQuery;
exports.ValidateUpdateBlog      = ValidateUpdateBlog;
exports.IdValidatorParams       = IdValidatorParams;


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

function getAllBlogsValidator(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_all_blogs_validator"
    };
    if (!_.isEmpty(req.query) && req.query.creation_date) {
        let creation_date = req.query.creation_date;
        if(moment(creation_date, 'YYYY-MM-DD',true).isValid())
            req.query.filter = {
                createdAt : {
                    $gte: `${creation_date}T00:00:00.000Z`,
                    $lt: `${creation_date}T23:59:59.999Z`
                }
            }
        else {
            logging.logError(apiReference, {EVENT : "DATE FORMAT IS NOT VALID", DATE : creation_date});
            responses.parameterMissingResponse(res, "Date format is not valid");
        }
    }

    next()
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