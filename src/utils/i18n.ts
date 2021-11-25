import config from '../config';
import logger from '../utils/logger';

import i18next from 'i18next';
import backend from 'i18next-node-fs-backend';

export const initI18n = async () => {
  await i18next.use(backend).init({
    backend: {
      loadPath: config.i18n.localeFileName,
    },
    lowerCaseLng: true,
    fallbackLng: config.i18n.fallbackLanguage,
    lng: config.i18n.fallbackLanguage,
    preload: config.i18n.languages,
    saveMissing: false,
    debug: false,
  });

  logger.info('i18n initialized: ' + i18next.language);

  return i18next;
};

export const t = (key: any, interpolations?: any) =>
  i18next.t(key, interpolations);

export const changeLanguage = (language: any) =>
  i18next.changeLanguage(
    language !== false ? language : config.i18n.fallbackLanguage,
  );

export const getAvailableLanguages = () => config.i18n.languages;

export const getAvailableLanguage = (userLanguage: any) =>
  config.i18n.languages.includes(userLanguage)
    ? userLanguage
    : config.i18n.fallbackLanguage;

export const currentLanguage = () => i18next.language;
