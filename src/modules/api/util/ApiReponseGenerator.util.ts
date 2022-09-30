import { ApiResponse } from "../types/api-response.model";
import { StatusCode } from "../types/status-code.type";

type GenerateResponseProps = {
  statusCode: StatusCode;
  message: string;
  data?: any;
};

export class ApiResponseGenerator {
  static generateResponse<T>(props: GenerateResponseProps): ApiResponse<T> {
    if (props.data) {
      return {
        message: props.message,
        statusCode: props.statusCode,
        data: props.data,
      };
    }

    return {
      message: props.message,
      statusCode: props.statusCode,
    };
  }
}
