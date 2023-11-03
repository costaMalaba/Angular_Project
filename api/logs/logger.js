import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-activity-logger" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "errror.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;