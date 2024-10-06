import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { redisConfig } from '../global/config/redis/redis.config';

@Injectable()
export class RedisService {
  private reids: Redis;
  constructor() {
    this.reids = new Redis(redisConfig);
  }

  async set(key: string, val: string): Promise<string> {
    return await this.reids.set(key, val);
  }

  async get(key: string): Promise<string | null> {
    return await this.reids.get(key);
  }

  async setExpireTime(
    key: string,
    val: string,
    expireTime: string,
  ): Promise<string> {
    return await this.reids.set(key, val, 'EX', expireTime);
  }
}
