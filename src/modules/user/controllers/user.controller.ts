import { Request, Response } from "express";

import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { ApiResponse } from "../../api/types/api-response.type";
import { StatusCode } from "../../api/types/status-code.type";

import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async save(request: Request, response: Response) {
    const userData = request.body as CreateUserDto;

    try {
      const apiResponse = await this.trySaveUser(userData, response);
      return apiResponse;
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async trySaveUser(userData: CreateUserDto, response: Response) {
    await this.userService.save(userData);
    const apiResponse: ApiResponse = {
      message: "Usuário cadastrado com sucesso",
      statusCode: StatusCode.CREATED,
    };
    return response.status(StatusCode.CREATED).json(apiResponse);
  }

  async findById(request: Request, response: Response) {
    const userId = request.params.userId as string;

    try {
      return this.tryFindUserById(userId, response);
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async tryFindUserById(userId: string, response: Response) {
    const foundUser = await this.userService.findById(userId);
    return response.status(200).json(foundUser);
  }

  async delete(request: Request, response: Response) {
    const userId = request.params.userId as string;

    try {
      return this.tryDeleteUser(userId, response);
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async tryDeleteUser(userId: string, response: Response) {
    await this.userService.delete(userId);
    const apiResponse: ApiResponse = {
      message: "Usuário excluído com sucesso",
      statusCode: StatusCode.SUCCESS,
    };
    return response.status(StatusCode.SUCCESS).json(apiResponse);
  }

  async update(request: Request, response: Response) {
    const userId = request.params.userId as string;
    const userData = request.body as CreateUserDto;

    const userDataToUpdate: UpdateUserDto = {
      id: userId,
      data: userData,
    };

    try {
      return this.tryUpdateUser(userDataToUpdate, response);
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
      statusCode: StatusCode.SUCCESS,
    };
    await this.userService.update(userDataToUpdate);
    return response.status(StatusCode.SUCCESS).json(apiResponse);
  }

  private handleApiErrorResponse(error: unknown, response: Response) {
    const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }
}
