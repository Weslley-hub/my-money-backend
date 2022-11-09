import { ValidationError } from "yup";
import { ApiErrorException } from "../exceptions/api-error.exception";

import { ApiErrorResponse } from "../types/api-error-response.type";
import { ApiError } from "../types/api-error.type";
import { StatusCode } from "../types/status-code.type";

import { YupValidationErrorHandler } from "./yup-validation-error.handler";

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
    const errorType = ExceptionHandler.getErrorType(error);
    const statusCode = ExceptionHandler.getStatusError(error);

    if (data) {
      return {
        message,
        statusCode,
        data: data,
        errorType,
      };
    }

    return {
      message,
      statusCode,
      errorType,
    };
  }

  static getErrorType(error: Error) {
    const apiErrorException = error as ApiErrorException;
    if (!apiErrorException.errorType) {
      return ApiError.INTERNAL_SERVER_ERROR;
    }
    return apiErrorException.errorType;
  }

  static getStatusError(error: Error) {
    const apiErrorException = error as ApiErrorException;
    if (!apiErrorException.statusCode) {
      return StatusCode.INTERNAL_SERVER_ERROR;
    }
    return apiErrorException.statusCode;
  }
}
