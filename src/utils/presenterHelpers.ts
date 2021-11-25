export const utcDate = (date: any) =>
  date instanceof Date ? date.toISOString() : date;

export const parseJsonField = <F>(field: F) =>
  field && (JSON.parse(field as unknown as string) as F);
