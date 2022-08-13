const log4js = require('log4js');

log4js.configure({
    appenders: {
      console: { type: "stdout"},
      logs: { type: "file", filename: "logs.log" },
    },
    categories: {
      default : { appenders: ["console","logs"], level: "all" },
    },
});

const logger = log4js.getLogger('logs');

exports.logger = logger;
