import { Newable } from 'i18next';
import logger from '../utils/logger';

const isFunction = (f) => f && typeof f === typeof Function;

export const returnOnException =
  (value?: unknown) => (_: any, __: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    const errorHandler = () => value;

    descriptor.value = function(...args) {
      try {
        const result = method.apply(this, args);
        const isPromise = isFunction(result?.then) && isFunction(result?.catch);

        if (isPromise) {
          return result.catch(errorHandler);
        }

        return result;
      } catch (_) {
        return errorHandler();
      }
    };
  };

export const throwException =
  <T extends Newable<Error>>(constructor: T) =>
    (_: any, __: string, descriptor: PropertyDescriptor) => {
      const method = descriptor.value;

      const errorHandler = (error) => {
        let extendedError: Error;

        try {
          extendedError = new constructor(error.message);
        } catch (_) {
          throw error;
        }

        throw extendedError;
      };

      descriptor.value = function(...args) {
        try {
          const result = method.apply(this, args);
          const isPromise = isFunction(result?.then) && isFunction(result?.catch);

          if (isPromise) {
            return result.catch(errorHandler);
          }

          return result;
        } catch (error) {
          return errorHandler(error);
        }
      };
    };

export const captureException =
  () => (_: any, __: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    const errorHandler = (error) => {
      logger.error(error);

      throw error;
    };

    descriptor.value = function(...args) {
      try {
        const result = method.apply(this, args);
        const isPromise = isFunction(result?.then) && isFunction(result?.catch);

        if (isPromise) {
          return result.catch(errorHandler);
        }

        return result;
      } catch (error) {
        return errorHandler(error);
      }
    };
  };
