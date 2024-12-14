interface IOption {
  readonly statusCode?: number;
  readonly cause?: Error | unknown;
}

export class ConflictError extends Error {
  public readonly options?: IOption;

  constructor(message: string, options: IOption = { statusCode: 409 }) {
    super(message);
    this.name = "ConflictError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictError);
    }
  }
}

export class ActionRequiredError extends Error {
  public readonly options?: IOption;
  constructor(message: string, options: IOption = { statusCode: 400 }) {
    super(message);
    this.name = "ActionRequiredError";
    this.options = options;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ActionRequiredError);
    }
  }
}
