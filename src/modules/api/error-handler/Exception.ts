import { ValidationError } from "yup";
import { ApiErrorException } from "../exception/ApiError";

import { ApiErrorResponse } from "../types/ApiErrorResponse";
import { ApiError } from "../types/ApiError";
import { StatusCode } from "../types/StatusCode";

import { YupValidationErrorHandler } from "./YupValidationError";

export class ExceptionHandler {
  static parseErrorAndGetApiResponse(
    error: unknown,
    data?: any
  ): ApiErrorResponse {
    const parsedError = error as Error;

    if (parsedError instanceof ValidationError) {
      return YupValidationErrorHandler.parseYupValidationErrorToApiResponse(
        error as ValidationError
      );
    }

    return this.parseErrorToApiResponse(parsedError, data);
  }

  private static parseErrorToApiResponse(
    error: Error,
    data?: any
  ): ApiErrorResponse {
    const message = error.message;
    const apiErrorException = error as ApiErrorException;

    const errorType = this.getErrorType(apiErrorException.errorType);
    const statusCode = this.getStatusCode(apiErrorException.statusCode);

    if (data) {
      return {
        message,
        statusCode,
        data: data,
        errorType
      };
    }

    return {
      message,
      statusCode,
      errorType
    };
  }

  private static getStatusCode(apiStatusCode?: number) {
    if (apiStatusCode) {
      return apiStatusCode;
    }

    return StatusCode.INTERNAL_SERVER_ERROR;
  }

  private static getErrorType(errorType?: ApiError) {
    if (errorType) {
      return errorType;
    }

    return ApiError.INTERNAL_SERVER_ERROR;
  }
}
