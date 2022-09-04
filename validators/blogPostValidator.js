const apiReferenceModule    = "blogPostValidator";
const logger                = require("../logging/loggerConfig").logger;
const Responses             = require("../utils/responses");
const constants             = require("../utils/constants");
const Joi                   = require("joi");
const _                     = require("underscore");
const moment                = require("moment");
const commonValidatorFunc   = require("./commonValidatorFunc");
const utils                 = require('../utils/utils');
const ObjectId              = require("mongodb").ObjectId;

exports.createBlog     = createBlog;
exports.getAllBlogs    = getAllBlogs
exports.getBlog        = getBlog;
exports.updateBlog     = updateBlog;
exports.deleteBlog     = deleteBlog;

const responses = new Responses();

function getAllBlogs(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_all_blogs_validator"
    };
    if (!_.isEmpty(req.query) && req.query.creation_date) {
        let creation_date = req.query.creation_date;
        if(moment(creation_date, "YYYY-MM-DD",true).isValid())
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

function createBlog(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "create_blog_validator"
    };

    let schema = Joi.object({
        title       : Joi.string().required(),
        content     : Joi.string().required(),
        description : Joi.string().optional()
    })
    if (commonValidatorFunc.isFieldsAreValid(apiReference, req.body, res, schema)) next();

}

function getBlog(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_blog_validator"
    };

    let schema = Joi.object({
        id: Joi.string().required()
    })

    if (commonValidatorFunc.isFieldsAreValid(apiReference, req.query, res, schema)) next();
}

function deleteBlog(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "delete_blog_validator"
    };

    let schema = Joi.object({
        id: Joi.string().required()
    })

    if(commonValidatorFunc.isFieldsAreValid(apiReference, req.params, res, schema)) {
        if(isInvalidId(apiReference, req.params.id)) return responses.validationError(res, constants.responseMessages.INVALID_ID);
        next()
    }
    
}

function updateBlog(req, res, next) {
    let apiReference = {
        module: apiReferenceModule,
        api: "update_blog_validator"
    };
    let id = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    if (utils.checkBlankField([id, title, content], apiReference)) return responses.parameterMissingResponse(res);

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