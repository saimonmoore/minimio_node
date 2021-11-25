import { validateSync, registerSchema } from 'class-validator';
import { Validator } from '../validator';

registerSchema(Validator);

const record = (props: any) => ({
  id: 1,
  title: 'foo',
  ...props,
});

const expectValidationError = ({ field, model, validation, message }: any) => {
  const errors = validateSync('RecordValidator', model);
  const error = errors.find((error) => error.property == field);

  if (!error) {
    throw new Error(`${field as string} field was valid`);
  }

  expect(error.constraints[validation]).toEqual(message);
};

describe('Validator', () => {
  describe('when title is blank', () => {
    it('returns a validation error', () => {
      expectValidationError({
        field: 'title',
        message: 'BACKEND_FIELD_EMPTY',
        model: record({ title: null }),
        validation: 'isNotEmpty',
      });
    });
  });

  describe('when title is larger than 255 chars', () => {
    it('returns a validation error', () => {
      expectValidationError({
        field: 'title',
        message: 'BACKEND_FIELD_TOO_LONG',
        model: record({ title: 'a'.repeat(256) }),
        validation: 'maxLength',
      });
    });
  });
});
