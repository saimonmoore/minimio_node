import { returnOnException, throwException } from '../decorators/exception';
import { retry } from '../decorators/retry';

export const noopDecorator =
  () => (_: any, __: string, descriptor: PropertyDescriptor) =>
    descriptor;

export const decorators = {
  cache: noopDecorator,
  returnOnException,
  throwException,
  captureException: noopDecorator,
  retry,
};
