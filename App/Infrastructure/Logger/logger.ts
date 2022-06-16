import * as Logger from "bunyan";
import config from "../Config"

const log = Logger.createLogger({
  name: config.application.APP_NAME,
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'debug',
      stream: process.stdout,
    },
    {
      level: 'error',
      stream: process.stdout,
    },
  ],
});

export default log;
