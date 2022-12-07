import { Request, Response } from "express";

import { ExceptionHandler } from "../../api/error-handler";
import { ApiResponse, StatusCode } from "../../api/types";

import {
  RevenueControllerInputDto,
  CreateRevenueServiceInputDto,
  UpdateRevenueServiceInputDto
} from "../dto";
import { RevenueService } from "../services";
import { FindByMonthAndYearAndUserIdController } from "../types";

export class RevenueController {
  private revenueService: RevenueService;

  constructor() {
    this.revenueService = new RevenueService();
  }

  async register(request: Request, response: Response) {
    const userId = request.userId || "";
    const requestData = request.body as RevenueControllerInputDto;

    try {
      const revenueServiceInput: CreateRevenueServiceInputDto = {
        amount: requestData.amount,
        month: requestData.month,
        year: requestData.year,
        expenseCategoryPercentages: requestData.expenseCategoryPercentages,
        userId
      };

      const apiResponse = await this.tryRegister(revenueServiceInput, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  private async tryRegister(
    revenueData: CreateRevenueServiceInputDto,
    response: Response
  ) {
    const apiResponse: ApiResponse = {
      message: "Receita cadastrada com sucesso",
      statusCode: StatusCode.CREATED
    };

    await this.revenueService.create(revenueData);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async update(request: Request, response: Response) {
    const userId = request.userId || "";

    const revenueId = request.params.revenueId || "";
    const requestData = request.body as RevenueControllerInputDto;

    try {
      const revenueServiceInput: UpdateRevenueServiceInputDto = {
        id: revenueId,
        amount: requestData.amount,
        month: requestData.month,
        year: requestData.year,
        expenseCategoryPercentages: requestData.expenseCategoryPercentages,
        userId
      };

      const apiResponse = await this.tryUpdate(revenueServiceInput, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  private async tryUpdate(
    revenueData: UpdateRevenueServiceInputDto,
    response: Response
  ) {
    const apiResponse: ApiResponse = {
      message: "Receita atualizada com sucesso",
      statusCode: StatusCode.SUCCESS
    };

    await this.revenueService.update(revenueData);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async findByMonthAndYear(request: Request, response: Response) {
    const userId = request.userId || "";
    const month = (request.query.month as string) || "";
    const year = (request.query.year as string) || "";

    try {
      const params: FindByMonthAndYearAndUserIdController = {
        month,
        year,
        userId
      };

      const apiResponse = await this.tryFindByMonthAndYear(params, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  private async tryFindByMonthAndYear(
    params: FindByMonthAndYearAndUserIdController,
    response: Response
  ) {
    const revenues = await this.revenueService.findByUserIdAndMonthAndYear(
      params
    );
    return response.status(StatusCode.SUCCESS).json(revenues);
  }

  async remove(request: Request, response: Response) {
    const revenueId = request.params.revenueId || "";

    try {
      const apiResponse = await this.tryRemove(revenueId, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  private async tryRemove(id: string, response: Response) {
    const apiResponse: ApiResponse = {
      message: "Receita deletada com sucesso",
      statusCode: StatusCode.SUCCESS
    };

    await this.revenueService.remove(id);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  private catchError(error: unknown, response: Response) {
    const apiErrorReponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiErrorReponse.statusCode).json(apiErrorReponse);
  }
}
