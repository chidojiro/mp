// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    localeDetection: false,
    reloadOnPrerender: true,
    localePath: path.resolve('./public/locales'),
  },
};
