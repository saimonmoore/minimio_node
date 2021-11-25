import { retry } from '../retry';

const staticAttempts = 3;
const callback = jest.fn().mockReturnValue(['test']);

class DecoratedClass {
  @retry({ attempts: staticAttempts, errorMatcher: [Error] })
  async testMethod(): Promise<void> {
    await this.called();
  }

  @retry({ errorMatcher: [Error] })
  async testMethodWithUnknownError(): Promise<void> {
    await this.called();
  }

  @retry({ errorMatcher: [Error], callback })
  async testMethodWithCallback(arg): Promise<void> {
    await this.called(arg);
  }

  async called(arg = 'test'): Promise<string> {
    return await Promise.resolve(arg);
  }
}

describe('retry decorator', () => {
  let testClass: DecoratedClass;
  let calledSpy;
  beforeEach(() => {
    testClass = new DecoratedClass();
    calledSpy = jest.spyOn(testClass, 'called');
  });
  describe('when there is no error', () => {
    it('calls the decorated method once', async () => {
      calledSpy.mockResolvedValueOnce('fulfilled');
      await testClass.testMethod();

      expect(calledSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when there is error', () => {
    describe('when attempted function fails immediately', () => {
      const errorMsg = 'rejected';
      describe('when it fails once', () => {
        it('retries once and calls the function twice', async () => {
          calledSpy.mockRejectedValueOnce(new Error(errorMsg));
          calledSpy.mockResolvedValueOnce('fulfilled');
          await testClass.testMethod();

          expect(calledSpy).toHaveBeenCalledTimes(2);
        });
      });
      describe('when it exceeds the retries', () => {
        it('retries 3 times and throws an error message', async () => {
          calledSpy.mockRejectedValue(new Error(errorMsg));

          try {
            await testClass.testMethod();
          } catch (e) {
            expect(e).not.toBeUndefined();
            expect(e.message.includes(errorMsg));
          }

          expect(calledSpy).toHaveBeenCalledTimes(3);
        });
      });
      describe('when the error type is not an accepted instance', () => {
        it('is called once', async () => {
          class UnknownError {}
          calledSpy.mockRejectedValue(new UnknownError());
          try {
            await testClass.testMethodWithUnknownError();
          } catch (e) {
            expect(e).not.toBeUndefined();
          }

          expect(calledSpy).toHaveBeenCalledTimes(1);
        });
      });
      describe('when a callback is passed to modify some of the method params', () => {
        it('executes the callback', async () => {
          calledSpy.mockResolvedValueOnce('fulfilled');
          await testClass.testMethodWithCallback('args');

          expect(callback).toHaveBeenCalled();
        });
      });
    });
  });
});
