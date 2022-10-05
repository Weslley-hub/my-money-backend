import { ApiError } from "../types/api-error.type";
import { StatusCode } from "../types/status-code.type";
import { ApiErrorException } from "./api-error.exception";

export class BadRequestException extends ApiErrorException {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCode.BAD_REQUEST,
      errorType: ApiError.BAD_REQUEST,
    });
  }
}
