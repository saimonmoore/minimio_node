import {
  returnOnException,
  captureException,
  throwException,
} from '../exception';
import { AppError } from '../../errors';

const fn = (error?: Error, value?: unknown) => {
  if (error) {
    throw error;
  }

  return value;
};

class DecoratedClass {
  @captureException()
  capturedMethod(error?: Error, value?: unknown) {
    return fn(error, value);
  }

  @captureException()
  async capturedMethodAsync(error?: Error, value?: unknown) {
    return await fn(error, value);
  }

  @returnOnException([])
  valueOverridedMethod(error?: Error, value?: unknown) {
    return fn(error, value);
  }

  @returnOnException([])
  async valueOverridedMethodAsync(error?: Error, value?: unknown) {
    return await fn(error, value);
  }

  @throwException(AppError)
  wrappedErrorMethod(error?: Error, value?: unknown) {
    return fn(error, value);
  }

  @throwException(AppError)
  async wrappedErrorMethodAsync(error?: Error, value?: unknown) {
    return await fn(error, value);
  }
}

describe('exception decorators', () => {
  describe('captureException', () => {
    describe('decorated function is sync', () => {
      it('raises the exception', () => {
        expect(() => {
          new DecoratedClass().capturedMethod(new Error());
        }).toThrow(Error);
      });

      it('returns the value', () => {
        const result = new DecoratedClass().capturedMethod(undefined, []);

        expect(result).toEqual([]);
      });
    });

    describe('decorated function is async', () => {
      it('raises the exception', async () => {
        await expect(
          new DecoratedClass().capturedMethodAsync(new Error()),
        ).rejects.toThrowError(Error);
      });

      it('returns the value', async () => {
        const result = await new DecoratedClass().capturedMethodAsync(
          undefined,
          [],
        );

        expect(result).toEqual([]);
      });
    });
  });

  describe('returnOnException', () => {
    describe('decorated function is sync', () => {
      it('overrides the return value when error', () => {
        const result = new DecoratedClass().valueOverridedMethod(new Error());
        expect(result).toEqual([]);
      });

      it('returns the value', () => {
        const result = new DecoratedClass().valueOverridedMethod(undefined, {});

        expect(result).toEqual({});
      });
    });

    describe('decorated function is async', () => {
      it('overrides the return value when error', async () => {
        const result = await new DecoratedClass().valueOverridedMethodAsync(
          new Error(),
        );
        expect(result).toEqual([]);
      });

      it('returns the value', async () => {
        const result = await new DecoratedClass().valueOverridedMethodAsync(
          undefined,
          {},
        );

        expect(result).toEqual({});
      });
    });
  });

  describe('throwException', () => {
    describe('decorated function is sync', () => {
      it('raises the exception', () => {
        expect(() => {
          new DecoratedClass().wrappedErrorMethod(new Error());
        }).toThrow(AppError);
      });

      it('returns the value', () => {
        const result = new DecoratedClass().wrappedErrorMethod(undefined, {});

        expect(result).toEqual({});
      });
    });

    describe('decorated function is async', () => {
      it('raises the exception', async () => {
        await expect(
          new DecoratedClass().wrappedErrorMethodAsync(new Error()),
        ).rejects.toThrowError(AppError);
      });

      it('returns the value', async () => {
        const result = await new DecoratedClass().wrappedErrorMethodAsync(
          undefined,
          {},
        );

        expect(result).toEqual({});
      });
    });
  });
});
