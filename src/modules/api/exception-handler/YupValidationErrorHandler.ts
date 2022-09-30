import { ValidationError } from "yup";

import { ApiResponse } from "../types/api-response.type";
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
}
