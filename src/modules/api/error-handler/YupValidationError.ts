import { ValidationError } from "yup";

import { ApiErrorResponse } from "../types/ApiErrorResponse";
import { ApiError } from "../types/ApiError";
import { StatusCode } from "../types/StatusCode";
import { ValidationFieldError } from "../types/ValidationFieldError";

export class YupValidationErrorHandler {
  static parseYupValidationErrorToApiResponse(
    validationErrors: ValidationError
  ): ApiErrorResponse<ValidationFieldError[]> {
    const validationFieldErrors = validationErrors.inner.map(
      this.parseYupValidationErrorToValidationFieldError
    );

    return {
      message: "Campos inválidos",
      statusCode: StatusCode.BAD_REQUEST,
      data: validationFieldErrors,
      errorType: ApiError.VALIDATION
    };
  }

  private static parseYupValidationErrorToValidationFieldError(
    validationError: ValidationError
  ) {
    const validationFieldError: ValidationFieldError = {
      field: validationError.path!,
      receivedValue: validationError.value,
      errors: validationError.errors
    };

    return validationFieldError;
  }
}
