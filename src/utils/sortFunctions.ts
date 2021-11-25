export const byCreatedAtDesc = (a: any, b: any) =>
  (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
