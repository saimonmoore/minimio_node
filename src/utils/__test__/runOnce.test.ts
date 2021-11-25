import { Redis } from 'ioredis';
import { runOnce } from './../runOnce';

jest.mock('./../redis', () => ({
  createRedisClient: jest.fn(),
}));

const mockedRedis = {
  get: jest.fn(),
  setex: jest.fn(),
};

describe('#runOnce', () => {
  const ttl = 5;

  const callback = jest.fn();
  const key = 'foo';

  describe('when callback has already been run for supplied key', () => {
    beforeEach(() => {
      mockedRedis.get.mockImplementation(() => Promise.resolve('true'));
    });

    it('does not call callback nor setex', async () => {
      await runOnce(
        key,
        () => callback(),
        ttl,
        mockedRedis as unknown as Redis,
      );

      expect(callback).not.toHaveBeenCalled();
      expect(mockedRedis.setex).not.toHaveBeenCalled();
    });
  });

  describe('when callback has not been run for supplied key', () => {
    beforeEach(() => {
      mockedRedis.get.mockImplementation(() => Promise.resolve(null));
    });

    it('calls callback and setex', async () => {
      await runOnce(
        key,
        () => callback(),
        ttl,
        mockedRedis as unknown as Redis,
      );

      expect(callback).toHaveBeenCalled();
      expect(mockedRedis.setex).toHaveBeenCalledWith(key, ttl, '"true"');
    });
  });
});
