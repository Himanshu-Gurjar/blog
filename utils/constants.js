

exports.responseMessages = {
    ACTION_COMPLETE         : "Successful",
    PARAMETER_MISSING       : "Insufficient information was supplied. Please check and try again.",
    NO_DATA_FOUND           : "No data found.",
    ERROR                   : "Some error occurred while executing. Please refresh the page and try again",
    INTERNAL_SERVER_ERROR   : "Internal Server Error."
}

exports.responseFlags = {
    ACTION_COMPLETE         : 200,
    PARAMETER_MISSING       : 100,
    NO_DATA_FOUND           : 400,
    ERROR                   : 404,
    INTERNAL_SERVER_ERROR   : 500
}