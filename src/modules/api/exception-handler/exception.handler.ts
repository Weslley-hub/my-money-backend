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
