
const apiReferenceModule = "blogs"
const Mongo              = require('./mongo');
const responses          = require('../utils/responses');
const constants          = require('../utils/constants');

exports.getBlogs    = getBlogs;
exports.getBlogById = getBlogById;
exports.addBlog     = addBlog;
exports.updateBlog  = updateBlog;
exports.deleteBlog  = deleteBlog;



async function getBlogs(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_blogs"
    }
    try {
        let condition = {}
        if(req.body) {
            let creation_date = req.body.creation_date ? req.body.creation_date : "";
            if (creation_date && moment(creation_date, 'YYYY-MM-DD',true).isValid()) {
                condition.createdAt = {
                    $gte: ISODate(creation_date),
                    $lt: ISODate(creation_date)
                }
            }
        }
        
        let data = await Mongo.getData(apiReference, condition);    
        return responses.actionCompleteResponse(res, data);
    } catch (error) {
        return responses.sendError(res);
    }

}

async function getBlogById(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "get_blog"
    }
    let id = req.query.id;
    try {
        let data = await Mongo.getData(apiReference, {_id : id})
        return responses.actionCompleteResponse(res, data);
    } catch (error) {
        console.log("err========", error);
        return responses.sendError(res);
    }
}

async function addBlog(req, res) {
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
        await Mongo.insert(apiReference, insertObj)
        return responses.actionCompleteResponse(res, [], "Blog Created");
    } catch (error) {
        return responses.sendError(res);
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

        await Mongo.updateData(apiReference, dataToUpdate, id)
        return responses.actionCompleteResponse(res, [], "Data Updated Successfully");

    } catch (error) {
        return responses.sendError(res);
    }   
}


async function deleteBlog(req, res) {
    let apiReference = {
        module: apiReferenceModule,
        api: "delete_blog"
    }
    try {
        let id = req.params.id;
        await Mongo.deleteBlog(apiReference, id);
        return responses.actionCompleteResponse(res);
    } catch (error) {
        return responses.sendError(res);
    }

}