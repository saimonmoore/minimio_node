import request from 'supertest';
import startServer from '../server';

describe('Routing', function () {
  let server: any;
  beforeEach(async () => (server = await startServer()));

  describe('[GET] /_system/alive', function () {
    it('exposes system alive endpoint', async () => {
      const response = await request(server)
        .get('/_system/alive')
        .expect('Content-Type', /text\/plain/)
        .expect(200);
      expect(response.text).toBe('ALIVE');
    });
  });
});
