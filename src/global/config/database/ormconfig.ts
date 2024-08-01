import { DataSource } from 'typeorm';
import dataSourceOptions from './dataSource';

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
