import dotenv from 'dotenv';

export type RaudiConfig = {
  freesoundClientId: string;
  freesoundClientSecret: string;
};

dotenv.config();

const failAndExit = (message: string): never => {
  // TODO: Setup more sophisticated and flexible logging. Perhaps Morgan?
  console.log(message);
  process.exit(1);
};

const getEnvOrExit = (key: string): string => {
  const maybeValue = process.env[key];

  if (maybeValue === null || maybeValue == undefined) {
    return failAndExit(`Config is missing key ${key}`);
  }

  if (!maybeValue) {
    return failAndExit(`Config key ${key} is missing a value`);
  }

  return maybeValue;
};

export const config: RaudiConfig = {
  freesoundClientId: getEnvOrExit('FREESOUND_CLIENT_ID'),
  freesoundClientSecret: getEnvOrExit('FREESOUND_CLIENT_SECRET'),
};
