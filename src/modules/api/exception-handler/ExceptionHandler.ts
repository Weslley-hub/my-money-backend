import { ValidationError } from "yup";

import { BusinessException } from "../exceptions/Business.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";

import { ApiErrorResponse } from "../types/api-error-response.type";
import { ApiError } from "../types/api-error.type";
import { StatusCode } from "../types/status-code.type";

import { YupValidationErrorHandler } from "./YupValidationErrorHandler";

export class ExceptionHandler {
  private static getApiErrorType(error: Error): ApiError {
    if (error instanceof NotFoundException) {
      return ApiError.NOT_FOUND;
    }

    if (error instanceof BusinessException) {
      return ApiError.BAD_REQUEST;
    }

    return ApiError.INTERNAL_SERVER;
  }

  private static getApiErrorCode(error: Error) {
    if (error instanceof NotFoundException) {
      return StatusCode.NOT_FOUND;
    }

    if (error instanceof BusinessException) {
      return StatusCode.BAD_REQUEST;
    }

    return StatusCode.INTERNAL_ERROR;
  }

  private static parseErrorToApiResponse(
    error: Error,
    data?: any
  ): ApiErrorResponse<any> {
    const message = error.message;
    const statusCode = this.getApiErrorCode(error);
    const errorType = this.getApiErrorType(error);

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

  static parseErrorAndGetApiResponse(
    error: unknown,
    data?: any
  ): ApiErrorResponse<any> {
    const parsedError = error as Error;

    if (parsedError instanceof ValidationError) {
      return YupValidationErrorHandler.parseYupValidationErrorToApiResponse(
        error as ValidationError
      );
    }

    return this.parseErrorToApiResponse(parsedError, data);
  }
}
