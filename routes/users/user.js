const apiReferenceModule  = "user"
const bcrypt              = require("bcrypt");
const collection          = require("../../models/users");
const Mongo               = require("../mongo");
const _                   = require("underscore");
const Responses           = require("../../utils/responses");
const constants           = require("../../utils/constants");
const jwt                 = require("jsonwebtoken");
const config              = require("config");
const utils               = require("../../utils/utils");

const User = new Mongo(collection);
const responses = new Responses();
const MAX_AGE = 24 * 60 * 60; // maximum age one day

exports.login  = login;
exports.signup = signup;

async function login(req, res) {
    let apiReference = {
        module : apiReferenceModule,
        api : "login"
    };
    
    try {
        let email = req.body.email;
        let password = req.body.password;
        let filter = {
            email : email
        }
    
        let userData = await User.getData(apiReference, filter);
    
        if(_.isEmpty(userData)) return responses.unauthorizedError(res, constants.responseMessages.USER_NOT_EXISTS)
        if(await utils.isPasswordInvalid(password, userData[0])) {
            return responses.unauthorizedError(res, constants.responseMessages.INCORRECT_PASSWORD);
        }

        let token = utils.getToken(email, {expiresIn : MAX_AGE});

        res.cookie(constants.JWT_TOKEN, token, { httpOnly: true, maxAge: MAX_AGE * 1000 }) // multiple by 1000 as cookie maxAge considered in miliseconds

        return responses.actionCompleteResponse(res, {id : userData._id}, constants.responseMessages.LOGIN_SUCCESSFULL);

    } catch (error) {
        return responses.internalErrorMessage(res);
    }
}


async function signup(req, res) {
    let apiReference = {
        module : apiReferenceModule,
        api : "signup"
    };

    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let insertObj = {
            name : name,
            email : email,
            password : password
        }
        let userData = await User.insert(apiReference, insertObj);
        let token = utils.getToken(email, {expiresIn : MAX_AGE});
        res.cookie(constants.JWT_TOKEN, token, { httpOnly: true, maxAge: MAX_AGE * 1000 })

        return responses.actionCompleteResponse(res,{id : userData._id}, constants.responseMessages.SIGNUP_SUCCESSFULL);

    } catch (error) {
        if(error.code === constants.MONGO_DUPLICATE_ERROR_CODE) {
            return responses.sendError(res, constants.responseMessages.USER_ALREADY_EXISTS);
        }
        return responses.internalErrorMessage(res);
    }

}
