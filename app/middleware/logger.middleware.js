import logger from "../logger.js";

const loggerMiddleware = (req, res, next) => {
  const user = req.user;
  logger.info(`${req.method} ${req.url}`, { user });
  next();
};

export default loggerMiddleware;
