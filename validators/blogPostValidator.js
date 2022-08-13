const apiReferenceModule    = 'blogPostValidator';
const logger                = require('../logging/loggerConfig').logger;
const Responses             = require('../utils/responses');
const constants             = require('../utils/constants');
const Joi                   = require('joi');
const _                     = require('underscore');
const moment                = require('moment');
const utils                 = require('../utils/utils');
const ObjectId              = require('mongodb').ObjectId;

exports.validateBlogDetails     = validateBlogDetails;
exports.getAllBlogsValidator    = getAllBlogsValidator
exports.idValidatorQuery        = idValidatorQuery;
exports.validateUpdateBlog      = validateUpdateBlog;
exports.idValidatorParams       = idValidatorParams;

const responses = new Responses();

/**
 * Valiate given obejct according to the schema
 */
function validateFields(apiReference, object, res, schema) {
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
                : 'Parameter missing or parameter type is wrong';

        logger.error(apiReference, validation.error.details);
        responses.validationError(res, errorReason);
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
            logger.error(apiReference, {EVENT : "DATE FORMAT IS NOT VALID", DATE : creation_date});
            return responses.validationError(res, constants.responseMessages.INVALID_DATE);
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

function idValidatorQuery(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "id_validator_for_query"
    };

    let schema = Joi.object({
        id: Joi.string().required()
    })

    if (validateFields(apiReference, req.query, res, schema)) next();
}

function idValidatorParams(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "id_validator_for_params"
    };

    let schema = Joi.object({
        id: Joi.string().required()
    })

    if(validateFields(apiReference, req.params, res, schema)) {
        if(isInvalidId(apiReference, req.params.id)) return responses.validationError(res, constants.responseMessages.INVALID_ID);
        next()
    }
    
}

function validateUpdateBlog(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "validateUpdateBlog"
    };
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;

    if (utils.checkBlankField([id, title, content])) return responses.parameterMissingResponse(res);

    if (isInvalidId(apiReference,id)) return responses.validationError(res, constants.responseMessages.INVALID_ID);
    
    next();

}

function isInvalidId(apiReference,id) {
    
    if(!ObjectId.isValid(id)) {
        logger.error(apiReference, {ERROR: "Invalid ID", DATA : id });
        return true
    }
    return false
}