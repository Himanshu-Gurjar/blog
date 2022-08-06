const logging           = require('../logging/logger');
const Blog              = require('../models/blogs');
const mongoCollection   = require('../models/blogs');
exports.getData     = getData;
exports.insert      = insert;
exports.updateData  = updateData;
exports.deleteBlog  = deleteBlog;

function getData(apiReference, condition={}) {
    return new Promise((resolve, reject) => {
        mongoCollection.find(condition)
        .then(result => {
            logging.log(apiReference, { EVENT: `Find data in `, DATA: result}); 
            resolve(result)
        })
        .catch(err => {
            logging.logError(apiReference, { DATA: {condition}, ERROR: err, EVENT: `Error in find data in ` });
            reject(err)
        })
    })
}


function insert(apiReference, data) {
    return new Promise((resolve, reject) => {
        const blog = new mongoCollection(data)
        blog.save()
        .then(result => {
            logging.log(apiReference, { EVENT: "insert data", DATA: result}); 
            resolve(result)
        })
        .catch(err => {
            logging.logError(apiReference, {ERROR: err, EVENT: "Error in inserting data"  });
            reject(err)
        })
    })
}


function updateData(apiReference, dataToUpdate, id) {
    return new Promise((resolve, reject) => {
        mongoCollection.findByIdAndUpdate(id, {$set : dataToUpdate})
        .then(result => {
            logging.log(apiReference, { EVENT: "upating data", DATA: result}); 
            resolve(result)
        })
        .catch(err => {
            logging.logError(apiReference, {ERROR: err, EVENT: "Error in updating data"  });
            reject(err)
        })
    })
}


function deleteBlog(apiReference, id) {
    return new Promise((resolve, reject) => {
        mongoCollection.findByIdAndDelete(id)
        .then(result => {
            logging.log(apiReference, { EVENT: "data delete successfully", DATA : id});
            resolve(result)
        })
        .catch(err => {
            logging.logError(apiReference, {ERROR: err, EVENT: "Error in deleting data in", DATA : id });
            reject(err)
        })
    })
}


