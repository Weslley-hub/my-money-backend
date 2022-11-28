import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/error-handler";
import { ApiResponse, StatusCode } from "../../api/types";
import { CreateExpenseServiceInput } from "../dto";
import { CreateExpenseControllerInput } from "../dto/CreateExpenseControllerInput";
import { ExpenseService } from "../services";

export class ExpenseController {
  private expenseService: ExpenseService;

  constructor() {
    this.expenseService = new ExpenseService();
  }

  async create(request: Request, response: Response) {
    try {
      const userId = request.userId || "";
      const requestData = request.body as CreateExpenseControllerInput;

      const serviceInputData: CreateExpenseServiceInput = {
        ...requestData,
        userId
      };

      const apiResponse = await this.tryCreate(serviceInputData, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  async tryCreate(data: CreateExpenseServiceInput, response: Response) {
    const apiReponse: ApiResponse = {
      message: "Gasto cadastrado com sucesso",
      statusCode: StatusCode.SUCCESS
    };

    await this.expenseService.create(data);
    return response.status(apiReponse.statusCode).json(apiReponse);
  }

  private catchError(error: unknown, response: Response) {
    const apiErrorResponse =
      ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
  }
}
