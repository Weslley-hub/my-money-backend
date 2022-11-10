import { ApiError } from "../types/api-error.type";
import { StatusCode } from "../types/status-code.type";
import { ApiErrorException } from "./api-error.exception";

export class InternalServerErrorException extends ApiErrorException {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      errorType: ApiError.INTERNAL_SERVER_ERROR,
    });
  }
}
