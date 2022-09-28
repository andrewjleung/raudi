import {
  DEV_HOST,
  Environment,
  PROD_HOST,
  RaudiBaseConfig,
} from '@raudi/common';
import dotenv from 'dotenv';

export type RaudiServerConfig = {
  freesoundClientId: string;
  freesoundClientSecret: string;
  clientUrl: string;
  serverUrl: string;
} & RaudiBaseConfig;

dotenv.config();

export const getEnvOrDefault = (key: string, def?: string): string => {
  const maybeValue = process.env[key];

  if (maybeValue === null || maybeValue === undefined) {
    if (def === undefined) {
      throw new Error(`Config is missing key: ${key}`);
    }

    return def;
  }

  return maybeValue;
};

const buildConfig = (): RaudiServerConfig => {
  const isProd = process.env.NODE_ENV === Environment.PROD;

  return {
    host: isProd ? PROD_HOST : DEV_HOST,
    freesoundClientId: getEnvOrDefault('FREESOUND_CLIENT_ID'),
    freesoundClientSecret: getEnvOrDefault('FREESOUND_CLIENT_SECRET'),
    clientUrl: isProd ? `https://${PROD_HOST}` : `http://${DEV_HOST}:80`,
    serverUrl: isProd
      ? `https://${PROD_HOST}/api`
      : `http://${DEV_HOST}:80/api`,
  };
};

export default buildConfig();
