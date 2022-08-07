

exports.responseMessages = {
    ACTION_COMPLETE         : "Successful",
    PARAMETER_MISSING       : "Insufficient information was supplied. Please check and try again.",
    NO_DATA_FOUND           : "No data found.",
    ERROR                   : "Some error occurred while executing. Please refresh the page and try again",
    INTERNAL_SERVER_ERROR   : "Internal Server Error",
    INVALID_ID              : "Id must be a string of 12 bytes or a string of 24 hex characters or an integer",
    INVALID_DATE            : "Date format is not valid",
    VALIDATION_ERROR        : "Validation Error occured",
    DATA_UPDATED            : "Data updated successfully",
    BLOG_CREATED            : "Blog created successfully"
}

exports.responseFlags = {
    ACTION_COMPLETE         : 200,
    PARAMETER_MISSING       : 100,
    NO_DATA_FOUND           : 400,
    VALIDATION_ERROR        : 403,
    ERROR                   : 404,
    INTERNAL_SERVER_ERROR   : 500,
}