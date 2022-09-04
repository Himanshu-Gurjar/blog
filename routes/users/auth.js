const apiReferenceModule = "auth";
const jwt                = require("jsonwebtoken");
const Responses          = require("../../utils/responses");
const logger             = require("../../logging/loggerConfig").logger;
const constants          = require("../../utils/constants");
const config             = require("config");
const responses = new Responses();

exports.authenticateUser = authenticateUser;


function authenticateUser(req, res, next) {
    let apiReference = {
        module : apiReferenceModule,
        api : "authenticate_user"
    }
    if(!req.cookies || !req.cookies.jwt) {
        logger.debug(apiReference, {MESSAGE : "jwt token not found in cookies", COOKIES : req.cookies});
        return responses.unauthorizedError(res, constants.responseMessages.LOGIN_REQUIRED)
    };

    let token = req.cookies.jwt;

    varifyJwtToken(apiReference, token, function(isVerified, result) {
        if(!isVerified) {
            return responses.sendError(res);
        }
        res.locals.user = result.tokenValue; // setting local user data 
        next();
    })
}

function varifyJwtToken(apiReference, token, callback) {
    jwt.verify(token, config.get("jwtSecret"), (err, result) => {
        if(err) {
            logger.error(apiReference, {ERROR : err})
            callback(false, result)
        }else {
            logger.debug(apiReference, {EVENT : "User authentication complete", DATA : result});
            callback(true, result)
        }
        
    })
}