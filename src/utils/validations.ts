import { registerSchema } from 'class-validator';
import { RecordValidator } from '../contexts/records/validator';

export const initValidators = () => {
  registerSchema(RecordValidator);
};
