const logger           = require('../logging/loggerConfig').logger;
const ObjectId          = require('mongodb').ObjectId;
const constants         = require('../utils/constants');
module.exports = class Blog {
    constructor() {
        this.mongoCollection = require('../models/blogs');
    }

    getData(apiReference, filter={}) {
        return new Promise((resolve, reject) => {
            this.mongoCollection.find(filter).sort({createdAt : -1})
            .then(result => {
                logger.info(apiReference, { EVENT: "GETTING DATA FOR BLOG", DATA: result, FILTER : filter}); 
                resolve(result)
            })
            .catch(err => {
                logger.error(apiReference, { DATA: filter, ERROR: err, EVENT: "ERROR IN GETTING DATA" });
                reject(err)
            })
        })
    }
    
    insert(apiReference, data) {
        return new Promise((resolve, reject) => {
            const blog = new this.mongoCollection(data)
            blog.save()
            .then(result => {
                logger.info(apiReference, { EVENT: "INSERTING BLOG DATA ", DATA: result}); 
                resolve(result)
            })
            .catch(err => {
                logger.error(apiReference, {ERROR: err, EVENT: "ERROR IN INSERTING BLOG DATA"  });
                reject(err)
            })
        })
    }
    
    update(apiReference, dataToUpdate, id) {
        return new Promise((resolve, reject) => {
            this.mongoCollection.updateOne({_id : id}, {$set : dataToUpdate})
            .then(result => {
                logger.info(apiReference, { EVENT: "UPDATING BLOG DATA", DATA: result}); 
                resolve(result)
            })
            .catch(err => {
                logger.error(apiReference, {ERROR: err, EVENT: "ERROR IN UPDATING BLOG DATA"  });
                reject(err)
            })
        })
    }
    
    delete(apiReference, id) {
        return new Promise((resolve, reject) => {
            this.mongoCollection.findByIdAndDelete(id)
            .then(result => {
                logger.info(apiReference, { EVENT: "DATA DELETED", DATA : id});
                resolve(result)
            })
            .catch(err => {
                logger.error(apiReference, {ERROR: err, EVENT: "ERROR IN DELETING DATA", DATA : id });
                reject(err);
            })
        })
    }
}

