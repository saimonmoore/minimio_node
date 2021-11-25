import request from 'supertest';

import startServer from '../../../server';
// import { AuthError } from '../../../errors';

let server: any;
const rid = 123;

describe('controller', () => {
  beforeAll(async () => (server = await startServer()));

  describe('POST /rest/mnimio/records', () => {
    const makeRequest = (payload, rid?: string | number) =>
      request(server)
        .post(`/rest/mnimio/records${rid ? ` ? rid = ${rid}` : ''}`)
        .set('Content-Type', 'application/json')
        .send(payload);

    describe('when record params are not given', () => {
      it('returns bad request', async () => {
        const res = await makeRequest({}, rid);

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual(
          "request.body should have required property 'record'",
        );
      });
    });

    describe('when rid is not valid', () => {
      it('returns a 400 status if rid is not provided', async () => {
        const res = await makeRequest({
          record: { id: 1, title: 'foo' },
        });

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual(
          `request.query should have required property 'rid'`,
        );
      });

      it('returns a 400 status if rid is not an integer', async () => {
        const res = await makeRequest(
          { record: { id: 1, title: 'foo' } },
          'rid',
        );

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('request.query.rid should be integer');
      });
    });

    describe('when minimum required record params are given', () => {
      it('creates a record resource', async () => {
        const res = await makeRequest({ record: { id: 1, title: 'foo' } }, rid);

        expect(res.status).toEqual(201);
      });
    });
  });
});
