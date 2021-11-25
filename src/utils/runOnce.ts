import { createRedisClient } from './redis';
import { CacheHandler } from './cache';

const DEFAULT_TTL = 60 * 60 * 24 * 2; // 2 days

class RunOnceHandler extends CacheHandler {
  async execute(key: any, callback: any, ttl: any) {
    const data = await this.read(key);

    if (data) {
      return false;
    }

    await callback();

    void this.write(key, ttl, 'true');

    return true;
  }
}

const runOnce = async (
  key: any,
  callback: any,
  ttl = DEFAULT_TTL,
  redisClient = createRedisClient(),
) => {
  return await new RunOnceHandler(redisClient).execute(key, callback, ttl);
};

export { runOnce };
