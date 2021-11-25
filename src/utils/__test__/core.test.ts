import { isValidId, compose } from '../core';

describe('isValidId', () => {
  describe('when id is not valid (i.e. parses to a result less than or equal to zero)', () => {
    it.each([[null], [undefined], [''], [-1], ['-1'], [0]])(
      'returns false for `%s`',
      (id) => {
        expect(isValidId(id)).toBeFalsy();
      },
    );
  });

  describe('when id is valid (i.e. an integer greater than zero)', () => {
    it.each([[1], [2], [3]])('returns true for `%i`', (id) => {
      expect(isValidId(id)).toBeTruthy();
    });
  });
});

describe('compose', () => {
  it('composes the functions from right to left', () => {
    const fn1 = (x: any) => x * 2;
    const fn2 = (y: number) => y + 1;

    expect(compose(fn1, fn2)(3)).toEqual(8);
    expect(compose(fn2, fn1)(3)).toEqual(7);
  });
});
