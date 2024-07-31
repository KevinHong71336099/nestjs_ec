import { config } from 'dotenv';
import path from 'path';

config();

const dataSources = {
  test: {
    type: 'postgres',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT ? process.env.PORT : '5432', 10),
    username: 'postgres',
    password: 'root',
    database: 'testing',
    entities: [path.join(__dirname, 'src/**/**/*.entity{.ts,.js}')],
    synchronize: true,
  },
  development: {
    type: 'postgres',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT ? process.env.PORT : '5432', 10),
    username: 'postgres',
    password: 'root',
    database: 'development',
    entities: [path.join(__dirname, 'src/**/**/*.entity{.ts,.js}')],
    synchronize: false,
  },
  production: {
    type: 'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.PORT ? process.env.PORT : '5432', 10),
    username: 'postgres',
    password: 'root',
    database: 'production',
    entities: [path.join(__dirname, 'src/**/**/*.entity{.ts,.js}')],
    synchronize: false,
  },
};

const currentEnv: string = process.env.NODE_ENV || 'development';
export default dataSources[currentEnv as keyof typeof dataSources];
