import { Request, Response } from "express";

import { ExceptionHandler } from "../../api/error-handler";
import { ApiResponse, StatusCode } from "../../api/types";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { UserService } from "../services";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async findById(request: Request, response: Response) {
    const userId = request.userId as string;

    try {
      const apiResponse = await this.tryFindUserById(userId, response);
      return apiResponse;
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async tryFindUserById(userId: string, response: Response) {
    const foundUser = await this.userService.findById(userId);
    return response.status(200).json(foundUser);
  }

  async delete(request: Request, response: Response) {
    const userId = request.userId as string;

    try {
      const apiResponse = this.tryDeleteUser(userId, response);
      return apiResponse;
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async tryDeleteUser(userId: string, response: Response) {
    await this.userService.delete(userId);
    const apiResponse: ApiResponse = {
      message: "Usuário excluído com sucesso",
      statusCode: StatusCode.SUCCESS
    };
    return response.status(StatusCode.SUCCESS).json(apiResponse);
  }

  async update(request: Request, response: Response) {
    const userData = request.body as CreateUserDto;

    const userDataToUpdate: UpdateUserDto = {
      id: request.userId as string,
      data: userData
    };

    try {
      const apiResponse = await this.tryUpdateUser(userDataToUpdate, response);
      return apiResponse;
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async tryUpdateUser(
    userDataToUpdate: UpdateUserDto,
    response: Response
  ) {
    const apiResponse: ApiResponse = {
      message: "Usuário atualizado com sucesso",
      statusCode: StatusCode.SUCCESS
    };
    await this.userService.update(userDataToUpdate);
    return response.status(StatusCode.SUCCESS).json(apiResponse);
  }

  private handleApiErrorResponse(error: unknown, response: Response) {
    const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }
}
