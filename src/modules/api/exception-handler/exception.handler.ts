import { ValidationError } from "yup";
import { ApiErrorException } from "../exceptions/api-error.exception";

import { ApiErrorResponse } from "../types/api-error-response.type";

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
    const { errorType, statusCode } = error as ApiErrorException;

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
}

