import { ValidationError } from "yup";

import { ApiErrorResponse } from "../types/api-error-response.type";
import { ApiError } from "../types/api-error.type";
import { StatusCode } from "../types/status-code.type";
import { ValidationFieldError } from "../types/validation-field-error.type";

export class YupValidationErrorHandler {
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

  static parseYupValidationErrorToApiResponse(
    validationErrors: ValidationError
  ): ApiErrorResponse<ValidationFieldError[]> {
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
      errorType: ApiError.VALIDATION,
    };
  }
}
