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
  async list(request: Request, response: Response) {
    try {
      const userId = request.userId || "";

      const apiResponse = await this.tryList(userId, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }
  async tryList(userId: string, response: Response) {
    const dataExpense = await this.expenseService.list(userId);
    const apiReponse: ApiResponse = {
      message: "Dados Retornados com sucesso",
      statusCode: StatusCode.SUCCESS,
      data: { dataExpense }
    };
    return response.status(apiReponse.statusCode).json(apiReponse);
  }
}
