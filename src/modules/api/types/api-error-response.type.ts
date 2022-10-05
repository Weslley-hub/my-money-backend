import { ApiError } from "./api-error.type";
import { ApiResponse } from "./api-response.type";

export type ApiErrorResponse<T = any> = ApiResponse<T> & {
  errorType: ApiError;
};
