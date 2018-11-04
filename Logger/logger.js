var logger = function() {
  // create a custom timestamp format for log statements
  const SimpleNodeLogger = require("simple-node-logger"),
    opts = {
      logFilePath: __dirname + "/logs/mylogfile.log",
      timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS"
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);
  return log;
};

exports.logger = logger;
