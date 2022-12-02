import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/error-handler";
import { StatusCode } from "../../api/types";
import {
  CreateUserDto,
  NewPasswordsDto,
  UserEmailDTO,
  UserLoginDto
} from "../dto";

import { AuthenticationService } from "../services";

const authenticationService = new AuthenticationService();

class AuthenticationController {
  async register(request: Request, response: Response) {
    const userData = request.body as CreateUserDto;
    console.log(userData);
    try {
      await authenticationService.register(userData);
      return response.status(StatusCode.CREATED).json({
        message: "Criado com sucesso",
        statuscode: StatusCode.CREATED
      });
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }
  async login(request: Request, response: Response) {
    const userLogin = request.body as UserLoginDto;

    try {
      const userData = await authenticationService.login(userLogin);
      return response.status(StatusCode.SUCCESS).json(userData);
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }
  async confirmEmail(request: Request, response: Response) {
    const userEmail = request.body as UserEmailDTO;
    try {
      await authenticationService.confirmEmail(userEmail);
      return response.status(StatusCode.SUCCESS).json({
        message: "Senha trocada com sucesso",
        statuscode: StatusCode.SUCCESS
      });
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }

  async newPassword(request: Request, response: Response) {
    const newPasswords = request.body as NewPasswordsDto;
    try {
      const newPassword = await authenticationService.newPassword(newPasswords);
      return response.status(StatusCode.SUCCESS).json({
        message: "Senha trocada com sucesso",
        statuscode: StatusCode.SUCCESS
      });
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }
}

export { AuthenticationController };
