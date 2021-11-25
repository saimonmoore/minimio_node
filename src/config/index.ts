import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;
const fileSuffix = nodeEnv ? `.${nodeEnv}` : '';

dotenv.config({ path: `.env${fileSuffix}` });

const { APP_ENV, PORT, LOG_LEVEL } = process.env as {
  APP_ENV: KeysEnvPartitions;
  [key: string]: any;
};

const applicationName = 'mnimio-node';

export enum Environments {
  production = 'production',
  development = 'development',
}
export type KeysEnvPartitions = keyof typeof Environments;

const appEnv = (): KeysEnvPartitions => APP_ENV ?? Environments.development;
const isProduction = (): boolean => appEnv() === Environments.production;

const config = {
  applicationName,
  appEnv,
  isProduction,
  isTest: nodeEnv === 'test',
  port: typeof PORT === 'undefined' ? 3000 : parseInt(PORT, 10),
  logLevel: LOG_LEVEL ?? 'debug',
  appBasePath: '/rest/mnimio',
  i18n: {
    phraseApp: {
      apiToken: 'secret',
    },
    languages: ['en'],
    tags: [],
    fallbackLanguage: 'en',
    localeFileName: './src/locales/{{lng}}.json',
  },
};

export default config;
