import { ApiError } from "../types/api-error.type";

type ApiErrorExceptionProps = {
  statusCode: number;
  message: string;
  errorType: ApiError;
};

export class ApiErrorException extends Error {
  statusCode: number;
  errorType: ApiError;

  constructor(props: ApiErrorExceptionProps) {
    super(props.message);
    this.statusCode = props.statusCode;
    this.errorType = props.errorType;
  }
}
