import { Record } from './type';
import { InvalidRecordError } from '../../errors';
import { validate } from 'class-validator';

export const RecordValidator = {
  name: 'RecordValidator',
  properties: {
    title: [
      { type: 'isNotEmpty', message: 'RECORD_FIELD_EMPTY' },
      {
        type: 'maxLength',
        constraints: [255],
        message: 'RECORD_FIELD_TOO_LONG',
      },
    ],
  },
};

export const validateRecord = async (record: Record) => {
  const errors = await validate('RecordValidator', record);

  if (errors.length > 0) {
    throw new InvalidRecordError(errors);
  }
};
