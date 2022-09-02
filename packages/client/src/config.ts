import { getUrlsAndHost, RaudiBaseConfig } from '@raudi/common';

export type RaudiClientConfig = {
  clientUrl: string;
  serverUrl: string;
} & RaudiBaseConfig;

const buildConfig = (): RaudiClientConfig => {
  if (import.meta.env?.VITE_CLIENT_PORT === undefined) {
    throw new Error('Missing client port from configuration.');
  }

  if (import.meta.env?.VITE_SERVER_PORT === undefined) {
    throw new Error('Missing server port from configuration');
  }

  const clientPort = import.meta.env.VITE_CLIENT_PORT;
  const serverPort = import.meta.env.VITE_SERVER_PORT;
  const isDockerized = import.meta.env.VITE_DOCKERIZED === 'true';

  const ports: Pick<RaudiBaseConfig, 'clientPort' | 'serverPort'> = {
    clientPort: Number(clientPort),
    serverPort: Number(serverPort),
  };

  return {
    ...ports,
    ...getUrlsAndHost(import.meta.env.PROD, isDockerized, ports),
  };
};

export default buildConfig();
