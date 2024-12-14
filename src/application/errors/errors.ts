interface IOption {
  readonly statusCode?: number;
  readonly cause?: Error | unknown;
}

export class BadRequestError extends Error {
  public readonly options?: IOption;

  constructor(message: string, options: IOption = { statusCode: 400 }) {
    super(message);
    this.name = "BadRequestError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }
  }
}
