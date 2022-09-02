import { Environment, getUrlsAndHost, RaudiBaseConfig } from '@raudi/common';
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
  const isDockerized = process.env.DOCKERIZED === 'true';
  const ports: Pick<RaudiBaseConfig, 'clientPort' | 'serverPort'> = {
    clientPort: Number(getEnvOrDefault('CLIENT_PORT')),
    serverPort: Number(getEnvOrDefault('SERVER_PORT')),
  };

  return {
    freesoundClientId: getEnvOrDefault('FREESOUND_CLIENT_ID'),
    freesoundClientSecret: getEnvOrDefault('FREESOUND_CLIENT_SECRET'),
    ...ports,
    ...getUrlsAndHost(isProd, isDockerized, ports),
  };
};

export default buildConfig();
