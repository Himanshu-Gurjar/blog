
const apiReferenceModule = "blogs"
const Mongo              = require('./mongo');
const Responses          = require('../utils/responses');
const constants          = require('../utils/constants');
const logger            = require('../logging/loggerConfig').logger;
exports.getBlogs    = getBlogs;
exports.getBlogById = getBlogById;
exports.createBlog  = createBlog;
exports.updateBlog  = updateBlog;
exports.deleteBlog  = deleteBlog;

const mongo = new Mongo();
const responses = new Responses();

async function getBlogs(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_blogs"
    }
    let filter = req.query.filter || {}
    try {
        let data = await mongo.getData(apiReference, filter);    
        return responses.actionCompleteResponse(res, data);
    } catch (error) {
        logger.error(apiReference, {FILTER : filter, ERROR : error})
        return responses.internalErrorMessage(res);
    }

}

async function getBlogById(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_blog"
    }
    let id = req.query.id;
    try {
        let data = await mongo.getData(apiReference, {_id : id})
        return responses.actionCompleteResponse(res, data);
    } catch (error) {
        logger.error(apiReference, {_ID : id, ERROR : error})
        return responses.internalErrorMessage(res);
    }
}

async function createBlog(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api : "create_blog"
    }

    let insertObj = {
        title : req.body.title,
        description : req.body.description ? req.body.description : "",
        content : req.body.content
    }

    try {
        let result = await mongo.insert(apiReference, insertObj)
        return responses.actionCompleteResponse(res, {Id : result._id}, constants.responseMessages.BLOG_CREATED);
    } catch (error) {
        logger.error(apiReference, {DATA : insertObj, ERROR : error})
        return responses.internalErrorMessage(res);
    }
}

async function updateBlog(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "update_blog"
    }
    try {
        let id = req.body.id;
        let dataToUpdate = {
            title : req.body.title,
            description : req.body.description ? req.body.description : "",
            content : req.body.content
        }
        let result = await mongo.update(apiReference, dataToUpdate, id)
        if(result && result.matchedCount === 0) {
            return responses.noDataFound(res);
        }
        return responses.actionCompleteResponse(res, [], constants.responseMessages.DATA_UPDATED);

    } catch (error) {
        logger.error(apiReference, {REQ_BODY : req.body, ERROR : error});
        return responses.internalErrorMessage(res);
    }   
}


async function deleteBlog(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "delete_blog"
    }
    try {
        let id = req.params.id;
        await mongo.delete(apiReference, id);
        return responses.actionCompleteResponse(res);
    } catch (error) {
        logger.error(apiReference, {REQ_BODY : req.params, ERROR : error});
        return responses.internalErrorMessage(res);
    }

}