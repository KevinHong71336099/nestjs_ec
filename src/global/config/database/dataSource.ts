import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const baseConfig: Partial<DataSourceOptions> = {
  type: 'postgres',
  entities: ['src/**/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

const envConfig: { [key: string]: Partial<DataSourceOptions> } = {
  test: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '5432', 10),
    username: 'postgres',
    password: 'root',
    database: 'testing',
    synchronize: true,
  },
  development: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '5432', 10),
    username: 'postgres',
    password: 'root',
    database: 'development',
    synchronize: false,
  },
  production: {
    host: process.env.HOST,
    port: parseInt(process.env.PORT || '5432', 10),
    username: 'postgres',
    password: 'root',
    database: 'production',
    synchronize: false,
  },
};

const dataSourceOptions: DataSourceOptions = {
  ...baseConfig,
  ...envConfig[env],
} as DataSourceOptions;

export default dataSourceOptions;
