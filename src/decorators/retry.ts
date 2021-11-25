import { RetryError } from '../errors';

interface RetryParams {
  attempts?: number;
  errorMatcher?: any[];
  callback?: (...args) => Array<any>;
}

const isInstanceValidator = (instanceArray, error) =>
  instanceArray.some((classInstance) => error instanceof classInstance);

const isFunction = (fn) => typeof fn === 'function' || fn instanceof Function;

export function retry({
  attempts = 3,
  errorMatcher = [],
  callback,
}: RetryParams) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    /**
     * descriptor: A TypedPropertyDescriptor — see the type, leveraging the Object.defineProperty under the hood.
     *     the nature how arrow function defines this inside.
     */
    const originalFn = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const retryAsync = async (
        currentAttempt: number,
        errorMatcher?: any[],
      ): Promise<any> => {
        try {
          if (callback && isFunction(callback)) {
            const retryArgs = [...args, currentAttempt];
            return await originalFn.apply(this, callback(...retryArgs));
          }
          return await originalFn.apply(this, args);
        } catch (error) {
          if (currentAttempt === 1) {
            throw new RetryError('exhausted retries', error as Error);
          }

          if (isInstanceValidator(errorMatcher, error)) {
            return retryAsync(currentAttempt - 1, errorMatcher);
          }

          throw error;
        }
      };

      return retryAsync(attempts, errorMatcher);
    };
  };
}
