import { ErrorNames, ErrorResponseCodes } from './';

export class CustomError {
  private _responseCode: ErrorResponseCodes;

  constructor(
    public message: string,
    public name: ErrorNames,
    public sqlErrorCode?: string
  ) {}

  log() {
    // TODO In this method we will log errors to somewhere
    console.log({
      error: this
    });
  }

  get responseCode(): ErrorResponseCodes {
    return this._responseCode || 422;
  }

  set responseCode(code: ErrorResponseCodes) {
    this._responseCode = code;
  }
}
