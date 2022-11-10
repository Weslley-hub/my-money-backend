export type ApiResponse<T = any> = {
  statusCode: number;
  message: string;
  data?: T;
};
