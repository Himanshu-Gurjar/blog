const log4js = require("log4js");
const MAX_LOG_FILE_SIZE = "5M"; // max log file size is 5 MB
log4js.configure({
  appenders: {
    console: { type: "stdout" },
    logs: { type: "file", maxLogSize : MAX_LOG_FILE_SIZE,filename: "logs/logs.log" },
    reqLogs: { type: "file",maxLogSize : MAX_LOG_FILE_SIZE, filename: "logs/request.log" }
  },
  categories: {
    default : { appenders: ["console", "logs"], level: "all" },
    request_logs: { appenders: ["console", "reqLogs"], level: "info" }
  },
});

exports.logger = log4js.getLogger();
exports.reqLogger = log4js.getLogger("request_logs");
