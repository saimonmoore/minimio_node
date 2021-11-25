export type RecordResponse = Omit<Record, 'foo'> & {
  bar?: boolean;
};

export type Record = {
  id?: number;
  title?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
};
