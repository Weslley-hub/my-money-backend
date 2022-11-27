import { ApiError } from "../types/ApiError";
import { StatusCode } from "../types/StatusCode";
import { ApiErrorException } from "./ApiError";

export class BadRequestException extends ApiErrorException {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCode.BAD_REQUEST,
      errorType: ApiError.BAD_REQUEST
    });
  }
}
