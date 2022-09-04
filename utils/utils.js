const logger = require("../logging/loggerConfig").logger;
const jwt    = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const constants = require("./constants");

exports.checkBlankField   = checkBlankField;
exports.getToken          = getToken;
exports.isPasswordInvalid = isPasswordInvalid;

function checkBlankField(arr, apiReference) {
    if (!Array.isArray(arr)) {
        return 1;
    }

    let arrlength = arr.length;
    for (let i = 0; i < arrlength; i++) {
        if (arr[i] === undefined || arr[i] == null) {
            arr[i] = "";
        } else {
            arr[i] = arr[i];
        }
        arr[i] = arr[i].toString().trim();
        if (arr[i] === "" || arr[i] === undefined) {
            logger.error(apiReference, {EVENT: "Check blank failed", MAN_VALUES: arr});
            return 1;
        }
    }
    return 0;
}


function getToken(tokenValue, options) {
    return jwt.sign({tokenValue}, config.get("jwtSecret"), options)
}


async function isPasswordInvalid(password, userData) {
    let auth = await bcrypt.compare(password, userData.password);
    if(!auth) {
        logger.error({ERROR : "Invalid password", DATA : {userData}});
        return true
    };
    logger.debug({MESSAGE : "password varified", DATA : {userData}});
    return false;
}