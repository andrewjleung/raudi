import { DEV_HOST, PROD_HOST, RaudiBaseConfig } from '@raudi/common';

export type RaudiClientConfig = {
  clientUrl: string;
  serverUrl: string;
} & RaudiBaseConfig;

const buildConfig = (): RaudiClientConfig => {
  if (import.meta.env.PROD) {
    return {
      host: PROD_HOST,
      clientUrl: `https://${PROD_HOST}`,
      serverUrl: `https://${PROD_HOST}/api`,
    };
  }

  return {
    host: DEV_HOST,
    clientUrl: `http://${DEV_HOST}:80`,
    serverUrl: `http://${DEV_HOST}:80/api`,
  };
};

export default buildConfig();
