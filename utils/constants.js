

exports.responseMessages = {
    ACTION_COMPLETE         : "Successful",
    PARAMETER_MISSING       : "Insufficient information was supplied. Please check and try again.",
    NO_DATA_FOUND           : "No data found.",
    ID_NOT_EXIST            : "Given id is not exist",
    BAD_REQUEST             : "Bad Request",
    INTERNAL_SERVER_ERROR   : "Internal Server Error",
    INVALID_ID              : "Id must be a string of 12 bytes or a string of 24 hex characters or an integer",
    INVALID_EMAIL           : "Please enter valid email",
    INVALID_DATE            : "Date format is not valid",
    VALIDATION_ERROR        : "Validation Error occured",
    UNAUTHORIZED            : "Invalid credentials",            
    DATA_UPDATED            : "Data updated successfully",
    BLOG_CREATED            : "Blog created successfully",
    USER_NOT_EXISTS         : "User not exists please signup",
    USER_ALREADY_EXISTS     : "User already exists please login",
    INCORRECT_PASSWORD      : "Entered password is incorrect",
    LOGIN_SUCCESSFULL       : "You have logged in successfully",
    SIGNUP_SUCCESSFULL      : "You have signup successfully",
    LOGIN_REQUIRED          : "Login Required",
}

exports.responseFlags = {
    PARAMETER_MISSING       : 100,
    ACTION_COMPLETE         : 200,
    NO_DATA_FOUND           : 204,
    BAD_REQUEST             : 400,
    UNAUTHORIZED            : 401, 
    VALIDATION_ERROR        : 403,
    NOT_FOUND               : 404,
    INTERNAL_SERVER_ERROR   : 500,
}

exports.JWT_TOKEN = "jwt";
exports.MONGO_DUPLICATE_ERROR_CODE = 11000