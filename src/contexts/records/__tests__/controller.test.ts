import request from 'supertest';
import startServer from '../../../server';
// import { AuthError, InvalidRecordError } from '../../../errors';
import Service from '../service';

jest.mock('../service', () => {
  return {
    createRecord: jest.fn(),
  };
});

let server: any;

const mockCreateRecord = ({ resolve, reject }: any) => {
  if (resolve) (Service.createRecord as any).mockResolvedValue(resolve);
  if (reject) (Service.createRecord as any).mockRejectedValue(reject);
  return Service.createRecord;
};

describe('Records', () => {
  beforeEach(async () => (server = await startServer()));

  describe('POST /rest/mnimio/records', () => {
    const makeRequest = (params: any) =>
      request(server)
        .post(`/rest/mnimio/records?rid=1`)
        .set('Content-Type', 'application/json')
        .send(params);

    describe('when record params are not given', () => {
      it('returns bad request', async () => {
        const res = await makeRequest({});
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual(
          "request.body should have required property 'record'",
        );
      });
    });

    describe('when required record params are not given', () => {
      it('returns bad request', async () => {
        const res = await makeRequest({ record: { foo: 'Foo' } });
        expect(res.status).toEqual(400);
        expect(res.body.message).toContain(
          "request.body.record should have required property 'title'",
        );
      });
    });

    describe('when minimum required record params are given', () => {
      let mockedCreateRecordFn: any;
      beforeEach(() => {
        mockedCreateRecordFn = mockCreateRecord({
          resolve: { id: 1, title: 'foo' },
        });
      });
      it('creates a record resource', async () => {
        const params = { record: { id: 1, title: 'foo' } };
        const res = await makeRequest(params);

        expect(mockedCreateRecordFn).toHaveBeenCalled();
        expect(mockedCreateRecordFn).toHaveBeenCalledWith({
          id: 1,
          title: 'foo',
        });
        expect(res.status).toEqual(201);
        expect(res.body).toEqual({ id: 1, title: 'foo' });
      });
    });
  });
});
