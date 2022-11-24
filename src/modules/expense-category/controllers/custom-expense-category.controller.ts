import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/exception-handler";
import { ApiResponse, StatusCode } from "../../api/types";
import {
  CustomExpenseCategoryInputDto,
  CreateCustomExpenseCategoryServiceInput,
  UpdateCustomExpenseCategoryServiceInput,
  DeleteCustomExpenseCategoryServiceInput
} from "../dto";
import { CustomExpenseCategoryService } from "../services";

class CustomExpenseCategoryController {
  private customExpenseCategoryService: CustomExpenseCategoryService;

  constructor() {
    this.customExpenseCategoryService = new CustomExpenseCategoryService();
  }

  async create(request: Request, response: Response) {
    const userId = request.userId;
    const customExpenseCategoryData =
      request.body as CustomExpenseCategoryInputDto;

    const data: CreateCustomExpenseCategoryServiceInput = {
      icon: customExpenseCategoryData.icon,
      name: customExpenseCategoryData.name,
      userId: userId || ""
    };

    try {
      const apiResponse = await this.tryCreate(data, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  private async tryCreate(
    data: CreateCustomExpenseCategoryServiceInput,
    response: Response
  ) {
    const apiResponse: ApiResponse = {
      message: "Categoria cadastrada com sucesso",
      statusCode: StatusCode.CREATED
    };

    await this.customExpenseCategoryService.create(data);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async update(request: Request, response: Response) {
    const expenseId = request.params.expenseCategoryId as string;
    const userId = request.userId;

    const customExpenseCategoryData =
      request.body as CustomExpenseCategoryInputDto;

    const data: UpdateCustomExpenseCategoryServiceInput = {
      id: expenseId,
      icon: customExpenseCategoryData.icon,
      name: customExpenseCategoryData.name,
      userId: userId || ""
    };

    try {
      const apiResponse = await this.tryUpdate(data, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  private async tryUpdate(
    data: UpdateCustomExpenseCategoryServiceInput,
    response: Response
  ) {
    const apiResponse: ApiResponse = {
      message: "Categoria atualizada com sucesso",
      statusCode: StatusCode.SUCCESS
    };

    await this.customExpenseCategoryService.update(data);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async list(request: Request, response: Response) {
    const userId = request.userId || "";

    try {
      const apiResponse = await this.tryList(userId, response);
      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  async tryList(userId: string, response: Response) {
    const expenseCategories = await this.customExpenseCategoryService.list(
      userId
    );

    return response.status(StatusCode.SUCCESS).json(expenseCategories);
  }

  async delete(request: Request, response: Response) {
    const userId = request.userId || "";
    const customExpenseCategoryId = request.params.expenseCategoryId || "";

    try {
      const data: DeleteCustomExpenseCategoryServiceInput = {
        customExpenseCategoryId,
        userId
      };
      const apiResponse = await this.tryDelete(data, response);

      return apiResponse;
    } catch (error) {
      const apiErrorResponse = this.catchError(error, response);
      return apiErrorResponse;
    }
  }

  async tryDelete(
    deleteData: DeleteCustomExpenseCategoryServiceInput,
    response: Response
  ) {
    const apiResponse: ApiResponse = {
      message: "Categoria deletada com sucesso",
      statusCode: StatusCode.SUCCESS
    };

    await this.customExpenseCategoryService.delete(
      deleteData.customExpenseCategoryId,
      deleteData.userId
    );

    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  private catchError(error: unknown, response: Response) {
    const apiErrorResponse =
      ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
  }
}

export { CustomExpenseCategoryController };
