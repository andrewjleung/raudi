import dotenv from 'dotenv';

export type RaudiServerConfig = {
  freesoundClientId: string;
  freesoundClientSecret: string;
};

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

const buildConfig = (): RaudiServerConfig => ({
  freesoundClientId: getEnvOrDefault('FREESOUND_CLIENT_ID'),
  freesoundClientSecret: getEnvOrDefault('FREESOUND_CLIENT_SECRET'),
});

export default buildConfig();
