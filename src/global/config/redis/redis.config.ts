import * as dotenv from 'dotenv';
import { RedisOptions } from 'ioredis';
import * as path from 'path';
dotenv.config({
  path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`),
});

export const redisConfig: RedisOptions = {
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  host: process.env.REDIS_HOST || '127.0.0.1',
  username: process.env.REDIS_USERNAME || 'kevin',
  password: process.env.REDIS_PASSWORD || 'secret',
  db: parseInt(process.env.REDIS_DB || '0', 10),
};
