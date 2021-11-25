import express, { Express } from 'express';
import path from 'path';
import * as OpenApiValidator from 'express-openapi-validator';

import errorHandler from './middleware/errorHandler';
import { initI18n } from './utils/i18n';
import { initValidators } from './utils/validations';

const apiSpec = path.join(__dirname, './apidoc/rest.yml');

const startServer = async (): Promise<Express> => {
  initValidators();
  await initI18n();

  const server = express();

  server.use(
    OpenApiValidator.middleware({
      apiSpec,
      operationHandlers: path.join(__dirname), // default false
      validateRequests: true, // (default)
      validateResponses: true, // false by default
      $refParser: {
        // to allow use of allOf (for inheritance in api schema rest.yml)
        // https://github.com/cdimascio/express-openapi-validator/#%EF%B8%8F-refparsermode-optional
        mode: 'dereference',
      },
    }),
  );
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  server.use(
    '/rest/mnimio/apidoc/rest.yml',
    express.static(apiSpec),
  );

  server.get('/_system/alive', (_req: any, res: any) => {
    res.status(200).set('Content-Type', 'text/plain').send('ALIVE');
  });

  server.use(errorHandler);

  return server;
};

export default startServer;
