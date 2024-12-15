interface IOption {
  readonly statusCode?: number;
  readonly cause?: Error | unknown;
}

export class HashingError extends Error {
  public readonly options?: IOption;

  constructor(message: string, options: IOption = { statusCode: 500 }) {
    super(message);
    this.name = "HashingError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HashingError);
    }
  }
}

export class AuthenticationError extends Error {
  public readonly options?: IOption;

  constructor(message: string, options: IOption = { statusCode: 401 }) {
    super(message);
    this.name = "AuthenticationError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HashingError);
    }
  }
}

export class UnauthenticatedError extends Error {
  public readonly options?: IOption;
  constructor(message: string, options: IOption = { statusCode: 401 }) {
    super(message);
    this.name = "UnauthenticatedError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthenticatedError);
    }
  }
}