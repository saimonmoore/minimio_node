/* eslint-disable no-unused-vars */
const initI18n = require('./dist/utils/i18n').initI18n;

execute(async () => await initI18n());

const execute = async (callback) =>
  console.log('=======> ', {
    result: await callback(),
  });

console.log('Welcome to the mnimio developer console!');
console.log('=====================================');
console.log();
console.log(
  "info: Remember, you're possibly in PRODUCTION! (With great power...)",
);
console.log();
console.log('Press enter to continue...');
