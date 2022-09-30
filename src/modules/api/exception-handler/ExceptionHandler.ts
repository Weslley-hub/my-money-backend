import { BusinessException } from "../exceptions/Business.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";
import { ApiResponse } from "../types/api-response.model";
import { StatusCode } from "../types/status-code.type";

export class ExceptionHandler {
  private static getApiErrorCode(error: Error) {
    if (error instanceof NotFoundException) {
      return StatusCode.NOT_FOUND;
    }

    if (error instanceof BusinessException) {
      return StatusCode.BAD_REQUEST;
    }

    return StatusCode.INTERNAL_ERROR;
  }

  private static parseErrorToApiResponse<T>(
    error: Error,
    data?: T
  ): ApiResponse<T> {
    const message = error.message;
    const statusCode = this.getApiErrorCode(error);

    if (data) {
      return {
        message,
        statusCode,
        data: data,
      };
    }

    return {
      message,
      statusCode,
    };
  }

  static parseErrorAndGetApiResponse<T>(
    error: unknown,
    data?: T
  ): ApiResponse<T> {
    const parsedError = error as Error;
    return this.parseErrorToApiResponse<T>(parsedError, data);
  }
}
