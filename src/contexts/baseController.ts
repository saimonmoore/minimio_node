import { compose } from '../utils/core';

export const withActionTracing = (handler: any) => (
  req: any,
  res: any,
  next: any,
) => {
  // trace/log here
  return handler(req, res, next);
};

export const baseHandler = compose(
  withActionTracing,
);

export const filterParams = (obj: any, args: any): any => ({
  ...args.reduce(
    (res: any, key: string) => ({
      ...res,
      [key]: obj[key],
    }),
    {},
  ),
});

export const allowedParams = (propertiesKey: any, { openapi }: any) => {
  const { allOf } = openapi.schema.requestBody.content[
    'application/json'
  ].schema.properties[propertiesKey];

  return allOf.map(({ properties }: any) => Object.keys(properties)).flat();
};
