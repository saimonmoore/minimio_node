require('jest-fetch-mock').enableMocks();

import * as i18nUtils from './src/utils/i18n';

(global as any).context = describe;

(global as any).mockOpenApiSchemaRequest = (
  handler: string,
  action: string,
) => ({
  openapi: {
    schema: {
      'x-eov-operation-handler': `contexts/${handler}`,
      'x-eov-operation-id': `contexts/${action}`,
    },
  },
});

const isObjectEqual = (expected, received) => {
  try {
    expect(expected).toEqual(received);
  } catch {
    return false;
  }

  return true;
};

expect.extend({
  toEqualObjectList(expected, received) {
    expect(expected).toHaveLength(received.length);

    const pass = received
      .map((receivedItem) =>
        expected.some((expectedItem) =>
          isObjectEqual(expectedItem, receivedItem),
        ),
      )
      .every(Boolean);

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            expected,
          )} not to be equals to ${this.utils.printExpected(received)}`,
        pass,
      };
    }

    return {
      message: () =>
        `expected ${this.utils.printReceived(
          expected,
        )} to be equals to ${this.utils.printExpected(received)}`,
      pass,
    };
  },
});

beforeAll(async () => {
  await i18nUtils.initI18n();
});
