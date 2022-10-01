import { ApiError } from "./api-error.type";
import { ApiResponse } from "./api-response.type";

export type ApiErrorResponse<T> = ApiResponse<T> & {
  errorType: ApiError;
};
