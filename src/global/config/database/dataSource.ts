import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const baseConfig: Partial<DataSourceOptions> = {
  type: 'postgres',
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

const envConfig: { [key: string]: Partial<DataSourceOptions> & SeederOptions } =
  {
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
      seeds: ['dist/database/seeds/**/*{.ts,.js}'],
      factories: ['dist/database/factories/**/*{.ts,.js}'],
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

const dataSourceOptions = {
  ...baseConfig,
  ...envConfig[env],
} as DataSourceOptions;

export default dataSourceOptions;
