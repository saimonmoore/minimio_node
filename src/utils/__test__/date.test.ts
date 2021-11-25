import { addWeekDays, formatShortDate } from '../date';

type TestTuple = [string, string];

describe('addWeekDays', () => {
  describe('when overlap between start date and days to add does NOT include the weekend', () => {
    it.each<TestTuple>([
      ['2021-06-21', '2021-06-23'],
      ['2021-06-22', '2021-06-24'],
      ['2021-06-23', '2021-06-25'],
    ])('adds days consecutively for `%s`', (startDate, expectedDate) => {
      const newDate = addWeekDays(new Date(startDate), 2);

      expect(formatShortDate(newDate)).toBe(expectedDate);
    });
  });

  describe('when overlap between start date and days to add DOES include the weekend', () => {
    it.each<TestTuple>([
      ['2021-06-24', '2021-06-29'],
      ['2021-06-25', '2021-06-30'],
      ['2021-06-26', '2021-07-01'],
      ['2021-06-27', '2021-07-02'],
    ])('adds days skipping weekend for `%s`', (startDate, expectedDate) => {
      const newDate = addWeekDays(new Date(startDate), 3);

      expect(formatShortDate(newDate)).toBe(expectedDate);
    });
  });
});
