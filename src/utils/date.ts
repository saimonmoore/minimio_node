import { addDays, isWeekend, subDays, format } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

export const formatShortDate = (date: Date): string =>
  format(date, DATE_FORMAT);

export const addWeekDays = (startDate: Date, days: number): Date => {
  let date = subDays(startDate, 1);

  for (let day = 0; day <= days; day++) {
    date = addDays(date, 1);

    if (isWeekend(date)) {
      date = addDays(date, 2);
    }
  }

  return date;
};
