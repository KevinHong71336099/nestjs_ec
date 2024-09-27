import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`),
});

const baseConfig: Partial<DataSourceOptions> = {
  type: 'postgres',
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
};

const envConfig: Partial<DataSourceOptions> & SeederOptions = {
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PROGRES_PORT || '5432', 10),
  username: process.env.PROGRES_USERNAME || 'postgres',
  password: process.env.PROGRES_PASSWORD || 'root',
  database: process.env.NODE_ENV,
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  seeds:
    process.env.NODE_ENV !== 'production'
      ? ['dist/database/seeds/**/*{.ts,.js}']
      : [],
  factories:
    process.env.NODE_ENV !== 'production'
      ? ['dist/database/factories/**/*{.ts,.js}']
      : [],
};

const dataSourceOptions = {
  ...baseConfig,
  ...envConfig,
} as DataSourceOptions;

export default dataSourceOptions;
