import { ValidationError } from "yup";

import { BusinessException } from "../exceptions/Business.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";

import { ApiResponse } from "../types/api-response.type";
import { StatusCode } from "../types/status-code.type";
import { YupValidationErrorHandler } from "./YupValidationErrorHandler";

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

  private static parseErrorToApiResponse(
    error: Error,
    data?: any
  ): ApiResponse<any> {
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

  static parseErrorAndGetApiResponse(
    error: unknown,
    data?: any
  ): ApiResponse<any> {
    const parsedError = error as Error;

    if (parsedError instanceof ValidationError) {
      return YupValidationErrorHandler.parseYupValidationErrorToApiResponse(
        error as ValidationError
      );
    }

    return this.parseErrorToApiResponse(parsedError, data);
  }
}
