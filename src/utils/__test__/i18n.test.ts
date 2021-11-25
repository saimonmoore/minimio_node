import config from '../../config';
import { initI18n, getAvailableLanguage } from '../i18n';
import localeEN from '../../locales/en.json';

describe('i18n', () => {
  it('Loads all specified languages', async () => {
    const i18next = await initI18n();

    const loadedLanguages = i18next.services.resourceStore.data;

    expect(Object.values(config.i18n.languages)).toEqual(
      expect.arrayContaining(Object.keys(loadedLanguages)),
    );
  });

  it('Resolves translations changing language', async () => {
    const i18next = await initI18n();

    void i18next.changeLanguage('en').then(() => {
      expect(localeEN.BACKEND_BAD_REQUEST).toBe(
        i18next.t('BACKEND_BAD_REQUEST'),
      );
    });
  });

  it('correctly interpolates variables', async () => {
    const i18next = await initI18n();

    void i18next.changeLanguage('en');
    expect(
      i18next.t('BACKEND_FIELD_INVALID', {
        field: 'title',
      }),
    ).toBe('The field title is invalid.');
  });

  describe('getAvailableLanguage', () => {
    it('returns the user selected language if english', function () {
      expect(getAvailableLanguage('en')).toEqual('en');
    });

    it('returns the fallback language if neither english nor german', function () {
      expect(getAvailableLanguage('es')).toEqual('de');
    });
  });
});
