const logger           = require("../logging/loggerConfig").logger;

module.exports = class CRUD {
    constructor(collectionName) {
        this.mongoCollection = collectionName;
    }

    async getData(apiReference, filter={}) {
        try {
            const result = await this.mongoCollection.find(filter).sort({createdAt : -1})
            logger.debug(apiReference, { EVENT: "GETTING DATA FOR", DATA: result, FILTER : filter}); 
            return result
        } catch (error) {
            logger.error(apiReference, { DATA: filter, ERROR: error, EVENT: "ERROR IN GETTING DATA" });
            throw error
        }
    }
    
    async insert(apiReference, data) {
        try {
            const collection = new this.mongoCollection(data)
            const result = await collection.save()
            logger.debug(apiReference, { EVENT: "INSERTING DATA ", DATA: result}); 
            return result
        } catch (error) {
            logger.error(apiReference, {ERROR: error, EVENT: "ERROR IN INSERTING DATA"  });
            throw error
        }
    }
    
    async update(apiReference, dataToUpdate, id) {
        try {
            const result = await this.mongoCollection.updateOne({_id : id}, {$set : dataToUpdate})
            logger.debug(apiReference, { EVENT: "UPDATING DATA", DATA: result}); 
            return result
        } catch (error) {
            logger.error(apiReference, {ERROR: error, EVENT: "ERROR IN UPDATING DATA"  });
            throw error
        }
    }
    
    async delete(apiReference, id) {
        try {
            const result = this.mongoCollection.findByIdAndDelete(id)
            logger.debug(apiReference, { EVENT: "DATA DELETED", DATA : id});
            return result
        } catch (error) {
            logger.error(apiReference, {ERROR: error, EVENT: "ERROR IN DELETING DATA", DATA : id });
            throw error
        }
    }
}

