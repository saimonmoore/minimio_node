import type { Redis } from 'ioredis';
import { returnOnException, captureException } from '../decorators/exception';
import { createRedisClient } from './redis';

export interface Cache {
  read<T>(key: string): Promise<T | null>;
  write(key: string, ttl: number, data: unknown): Promise<void> | void;
  fetch<T>(key: string, ttl: number, callback: () => Promise<T>): Promise<T>;
}

class CacheHandler implements Cache {
  redis: Redis;
  constructor(redis: Redis) {
    this.redis = redis;
  }

  @returnOnException(null)
  @captureException()
  async read<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);

    return data ? JSON.parse(data) : data;
  }

  @returnOnException()
  @captureException()
  async write(key: string, ttl: number, data: unknown) {
    await this.redis.setex(key, ttl, JSON.stringify(data));
  }

  async fetch<T>(
    key: string,
    ttl: number,
    callback: () => Promise<T>,
  ): Promise<T> {
    let data = await this.read<T>(key);

    if (!data) {
      data = await callback();

      void this.write(key, ttl, data);
    }

    return data;
  }
}

const createCacheHandler = (): Cache => {
  const redisClient = createRedisClient();

  return new CacheHandler(redisClient);
};

export { createCacheHandler, CacheHandler };
