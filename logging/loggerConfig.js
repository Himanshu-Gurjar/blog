const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: "stdout" },
    logs: { type: "file", filename: "logs.log" },
    reqLogs: { type: "file", filename: "request.log" }
  },
  categories: {
    default : { appenders: ["console", "logs"], level: "all" },
    request_logs: { appenders: ["console", "reqLogs"], level: "info" }
  },
});

exports.logger = log4js.getLogger();
exports.reqLogger = log4js.getLogger("request_logs");
