const logger = require('../logging/loggerConfig');

exports.checkBlankField = checkBlankField;

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
        if (arr[i] === '' || arr[i] === "" || arr[i] === undefined) {
            logger.error(apiReference, {EVENT: "Check blank failed", MAN_VALUES: arr});
            return 1;
        }
    }
    return 0;
}