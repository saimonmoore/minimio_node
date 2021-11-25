/* eslint-disable @typescript-eslint/unbound-method */
import { InvalidRecordError } from '../../../errors';
import { registerSchema } from 'class-validator';
import { Validator } from '../validator';
import Service from '../service';
import { Record } from '../type';

registerSchema(Validator);

describe('Service', () => {
  describe('#create', () => {
    describe('when records attributes are invalid', () => {
      const record: Record = {
        id: undefined,
        title: undefined,
      };

      it('throws an InvalidRecordError exception', () => {
        const service = new Service();
        expect(
          service.create(record),
        ).toThrowError(InvalidRecordError);
      });
    });

    describe('when record attributes are valid', () => {
      const record = { id: 1, title: 'foo' }
      const params = { title: 'foo' }

      it('creates a record', () => {
        const service = new Service();

        const result = service.create(params);

        expect(result).toEqual(record);
      });
    });
  });
});
