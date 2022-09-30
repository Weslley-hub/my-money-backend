import { ValidationError } from "yup";

import { BusinessException } from "../exceptions/Business.exception";
import { NotFoundException } from "../exceptions/NotFound.exception";

import { ApiResponse } from "../types/api-response.type";
import { StatusCode } from "../types/status-code.type";
import { ValidationFieldError } from "../types/validation-field-error.type";

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

  private static parseYupValidationErrorToValidationFieldError(
    validationError: ValidationError
  ) {
    const validationFieldError: ValidationFieldError = {
      field: validationError.path!,
      receivedValue: validationError.value,
      errors: validationError.errors,
    };

    return validationFieldError;
  }

  private static parseYupValidationErrorToApiResponse(
    validationErrors: ValidationError
  ): ApiResponse<ValidationFieldError[]> {
    const validationFieldErrors: ValidationFieldError[] = [];

    validationErrors.inner.forEach((validationError) => {
      const validationFieldError =
        this.parseYupValidationErrorToValidationFieldError(validationError);
      validationFieldErrors.push(validationFieldError);
    });

    return {
      message: "Campos inválidos",
      statusCode: StatusCode.BAD_REQUEST,
      data: validationFieldErrors,
    };
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
      return this.parseYupValidationErrorToApiResponse(
        error as ValidationError
      );
    }

    return this.parseErrorToApiResponse(parsedError, data);
  }
}
