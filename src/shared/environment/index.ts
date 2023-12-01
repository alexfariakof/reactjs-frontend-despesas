import { environment as devEnvironment } from './environment.dev';
import { environment as prodEnvironment } from './environment.prod';

const environmentConfig = process.env.NODE_ENV === 'production' ? prodEnvironment : devEnvironment;

export const environment = environmentConfig;
