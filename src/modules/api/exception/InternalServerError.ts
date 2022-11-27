import { ApiError } from "../types/ApiError";
import { StatusCode } from "../types/StatusCode";
import { ApiErrorException } from "./ApiError";

export class InternalServerErrorException extends ApiErrorException {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      errorType: ApiError.INTERNAL_SERVER_ERROR
    });
  }
}
