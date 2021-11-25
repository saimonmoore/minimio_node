// eslint-disable-next-line
import { ProxyError, AppError, AuthError } from '../errors';
import logger from '../utils/logger';
import config from '../config';
const logErrors = ['development'].includes(config.appEnv());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: any, res: any, _next: any) => {
  if (logErrors) {
    logger.info(
      `[${req.method as string}] ${
        req.originalUrl as string
      } params: ${JSON.stringify(req.params)} body: ${JSON.stringify(
        req.body,
      )}`,
    );
    logErrors && logger.error(err.stack);
    if (err.response) {
      logger.error(JSON.stringify(err.response));
    }
  }
  if (err instanceof ProxyError && err.response) {
    return res.status(err.response.statusCode).json(err.response.error);
  }
  if (err instanceof AuthError) {
    return res.status(err.code).json(err.response);
  }
  if (err instanceof AppError && err.response) {
    return res.status((err as any).code || 500).json(err.response);
  }
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};
export default errorHandler;
