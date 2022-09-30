export type ApiResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
};
