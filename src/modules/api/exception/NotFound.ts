import { ApiError } from "../types/ApiError";
import { StatusCode } from "../types/StatusCode";
import { ApiErrorException } from "./ApiError";

export class NotFoundException extends ApiErrorException {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCode.NOT_FOUND,
      errorType: ApiError.NOT_FOUND
    });
  }
}
