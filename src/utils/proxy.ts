import fetch from 'node-fetch';
import * as Sentry from '@sentry/node';
import { currentLanguage } from './i18n';
import config from '../config';
import { ProxyError } from '../errors';

type Args = {
  query?: any;
};

const appendQueryParams = (url: any, params: any) => {
  if (typeof params !== 'object') {
    return url;
  }

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );
};

const executeGet = async (url: any, args: Args = {}) => {
  const { query, ...headers } = args;
  const fullUrl = new URL(url, config.restBaseUrl);
  appendQueryParams(fullUrl, query);
  return await fetchJson(fullUrl.toString(), headers);
};
const executeWithBodyArgs = async (url: any, args: any) => {
  const fullUrl = new URL(url, config.restBaseUrl);
  return await fetchJson(fullUrl.toString(), args);
};
const setHeadersForRequest = (args: any) => ({
  ...args,
  headers: { ...args.headers, 'accept-language': currentLanguage() },
});
const fetchJson = async (url: any, args = {}) => {
  let res = {};
  try {
    res = await fetch(url, setHeadersForRequest(args));
  } catch (e) {
    Sentry.captureException(e);
    throw new ProxyError();
  }
  const contentType = (res as any).headers.get('content-type');
  if (!(res as any).ok) {
    const jsonResponse = await (res as any).json();
    const statusCode = (res as any).status;
    throw new ProxyError({ error: { ...jsonResponse }, statusCode });
  } else if (contentType && contentType.indexOf('application/json') !== -1) {
    const jsonResponse = await (res as any).json();
    return jsonResponse;
  } else {
    return {};
  }
};
export const get = (url: any, options = {}) => executeGet(url, options);
export const put = (url: any, options = {}) =>
  executeWithBodyArgs(url, { method: 'PUT', ...options });
export const del = (url: any, options = {}) =>
  executeWithBodyArgs(url, { method: 'DELETE', ...options });
