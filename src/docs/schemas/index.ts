import { CommonErrorSchema } from "./common-error.schema";
import { FieldValidationErrorSchema } from "./field-validation-error.schema";
import { UserSchema } from "./user.schema";
import { ValidationErrorSchema } from "./validation-error.schema";
import { UserInputSchema } from "./user-input.schema";

const schemas = {
  CommonErrorSchema,
  FieldValidationErrorSchema,
  ValidationErrorSchema,
  UserSchema,
  UserInputSchema,
};

export { schemas };
