import { DEV_HOST, PROD_HOST, RaudiBaseConfig } from '@raudi/common';

export type RaudiClientConfig = {
  clientUrl: string;
  serverUrl: string;
} & RaudiBaseConfig;

const buildConfig = (): RaudiClientConfig => {
  // if (import.meta.env?.VITE_CLIENT_PORT === undefined) {
  //   throw new Error('Missing client port from configuration.');
  // }

  // if (import.meta.env?.VITE_SERVER_PORT === undefined) {
  //   throw new Error('Missing server port from configuration');
  // }

  const clientPort = import.meta.env.VITE_CLIENT_PORT;
  const serverPort = import.meta.env.VITE_SERVER_PORT;

  const ports = {
    clientPort: Number(clientPort),
    serverPort: Number(serverPort),
  };

  if (import.meta.env.PROD) {
    return {
      ...ports,
      host: PROD_HOST,
      clientUrl: `https://${PROD_HOST}`,
      serverUrl: `https://${PROD_HOST}/api`,
    };
  }

  return {
    ...ports,
    host: DEV_HOST,
    clientUrl: `http://${DEV_HOST}:80`,
    serverUrl: `http://${DEV_HOST}:80/api`,
  };
};

export default buildConfig();
