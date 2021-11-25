import * as Sentry from '@sentry/node';
import axios from 'axios';
import logger from './logger';

export const fetchFromService = async (
  serviceConfig: any,
  path: string,
  params: any,
) => {
  try {
    const { host, basePath } = serviceConfig;
    const { data } = await axios.get(
      `${host as string}${basePath as string}${path}`,
      {
        params,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return data.collection;
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);
  }
};

export const extractIdsFromPositionDetailsRecords = (
  records: any,
  typeId: any,
) =>
  records
    .map((record: any) => record[typeId])
    .filter((id: any) => id)
    .join(',');
