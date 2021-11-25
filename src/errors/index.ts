import { t } from '../utils/i18n';

const errorResponse = (key: any, interpolations?: any) => ({
  localization_key: key,
  localization_value: t(key, interpolations),
});

export class ProxyError extends Error {
  response: any;
  constructor(response?: any) {
    super();

    if (response) {
      this.response = response;
      this.message = response.statusText || '';
    }
  }
}

export class NestedError extends Error {
  original: any;
  constructor(message: string, original: Error) {
    super(`message: ${message} original error: ${original.message}`);

    this.original = original;
  }
}

export class SystemMessageError extends Error {
  response: any;
  constructor(message?: any) {
    super(message);

    this.response = errorResponse('SYSTEM_MESSAGE_ERROR');
    this.message = message || '';
  }
}

export class AppError extends Error {
  response: any;
  constructor(message?: any) {
    super(message);

    this.response = errorResponse('BACKEND_UNKNOWN_ERROR');
    this.message = message || '';
  }
}

export class AuthError extends AppError {
  code: any;
  override response: any;
  constructor(message?: any) {
    super(message);

    this.response = errorResponse('BACKEND_REQUESTER_NOT_AUTHORIZED');
    this.code = 403;
  }
}

export class NotFoundError extends AppError {
  code: any;
  override response: any;
  constructor(message?: any) {
    super(message);

    this.response = errorResponse('BACKEND_NOT_FOUND');
    this.code = 404;
  }
}

export class BadRequestError extends AppError {
  code: any;
  override response: any;
  constructor(message?: any) {
    super(message);

    this.response = errorResponse('BACKEND_BAD_REQUEST');
    this.code = 400;
  }
}

export class InvalidRecordError extends AppError {
  code: any;
  override response: any;
  constructor(message?: any) {
    super(message);

    this.response = errorResponse('BACKEND_INVALID_RECORD');
    this.code = 400;
  }
}

export class RestApiError extends AppError {
  code: any;
  original: any;
  override response: any;
  constructor(original: any, message: any) {
    super(message);

    this.name = 'RestApiError';
    this.original = original;

    if (original.response) {
      this.code = original.response.status;
      this.response = original.response.statusText || '';
    }
  }
}
