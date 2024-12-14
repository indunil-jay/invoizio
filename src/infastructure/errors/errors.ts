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
