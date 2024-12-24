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

export class UnauthorizedError extends Error {
  public readonly options?: IOption;
  constructor(message: string, options: IOption = { statusCode: 401 }) {
    super(message);
    this.name = "UnauthorizedError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }
  }
}

export class DataBaseError extends Error {
  public readonly options?: IOption;
  constructor(options: IOption = { statusCode: 401 }) {
    // const message =
    //   "Something went wrong. Our team has been notified and is working to resolve the issue. Please try again later.";
    super(
      "Something went wrong. Our team has been notified and is working to resolve the issue. Please try again later."
    );
    this.name = "DataBaseError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DataBaseError);
    }
  }
}
