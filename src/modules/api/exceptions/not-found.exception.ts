import { ApiError } from "../types/api-error.type";
import { StatusCode } from "../types/status-code.type";
import { ApiErrorException } from "./api-error.exception";

export class NotFoundException extends ApiErrorException {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCode.NOT_FOUND,
      errorType: ApiError.NOT_FOUND,
    });
  }
}
