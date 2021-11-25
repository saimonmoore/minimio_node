export const compose = (...fns: any[]) =>
  fns.reduce(
    (outerFunction, innerFunction) =>
      (...args: any[]) =>
        outerFunction(innerFunction(...args)),
  );

export const isValidId = (id: any) => {
  return Number.parseInt(id, 10) > 0;
};
