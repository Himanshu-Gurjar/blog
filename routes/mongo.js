const logging           = require('../logging/logger');
const Blog              = require('../models/blogs');

module.exports = class CRUD {
    constructor() {
        this.mongoCollection = require('../models/blogs');
    }

    getData(apiReference, condition={}) {
        return new Promise((resolve, reject) => {
            this.mongoCollection.find(condition).sort({createdAt : -1})
            .then(result => {
                logging.log(apiReference, { EVENT: `Find data in `, DATA: result, FILTER : condition}); 
                resolve(result)
            })
            .catch(err => {
                logging.logError(apiReference, { DATA: {condition}, ERROR: err, EVENT: `Error in find data in ` });
                reject(err)
            })
        })
    }
    
    insert(apiReference, data) {
        return new Promise((resolve, reject) => {
            const blog = new this.mongoCollection(data)
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
    
    update(apiReference, dataToUpdate, id) {
        return new Promise((resolve, reject) => {
            this.mongoCollection.findByIdAndUpdate(id, {$set : dataToUpdate})
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
    
    delete(apiReference, id) {
        return new Promise((resolve, reject) => {
            this.mongoCollection.findByIdAndDelete(id)
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
}

