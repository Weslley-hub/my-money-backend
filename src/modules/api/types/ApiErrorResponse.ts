import { ApiErrorEnum } from "./ApiError";
import { ApiResponse } from "./ApiResponse";

export type ApiErrorResponse<T = any> = ApiResponse<T> & {
  errorType: ApiErrorEnum;
};
