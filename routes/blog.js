
const apiReferenceModule = "blogs"
const Mongo              = require('./mongo');
const responses          = require('../utils/responses');
const constants          = require('../utils/constants');
const logging            = require('../logging/logger');
exports.getBlogs    = getBlogs;
exports.getBlogById = getBlogById;
exports.createBlog  = createBlog;
exports.updateBlog  = updateBlog;
exports.deleteBlog  = deleteBlog;

const mongo = new Mongo();

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
        logging.logError(apiReference, {FILTER : filter, ERROR : error})
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
        logging.logError(apiReference, {_ID : id, ERROR : error})
        return responses.internalErrorMessage(res);
    }
}

async function createBlog(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api : "add_blog"
    }

    let insertObj = {
        title : req.body.title,
        description : req.body.description ? req.body.description : "",
        content : req.body.content
    }

    try {
        await mongo.insert(apiReference, insertObj)
        return responses.actionCompleteResponse(res, [], "Blog Created");
    } catch (error) {
        logging.logError(apiReference, {DATA : insertObj, ERROR : error})
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
        await mongo.updateData(apiReference, dataToUpdate, id)
        return responses.actionCompleteResponse(res, [], "Data Updated Successfully");

    } catch (error) {
        logging.logError(apiReference, {REQ_BODY : req.body, ERROR : error});
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
        await mongo.deleteBlog(apiReference, id);
        return responses.actionCompleteResponse(res);
    } catch (error) {
        logging.logError(apiReference, {REQ_BODY : req.params, ERROR : error});
        return responses.internalErrorMessage(res);
    }

}