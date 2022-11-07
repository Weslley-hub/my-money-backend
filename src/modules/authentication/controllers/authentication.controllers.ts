import { CreateUserDto } from "../../user/dto/create-user.dto";
import { Request, Response } from "express";
import { AuthenticationService } from "../services/authentication.service";
import { StatusCode } from "../../api/types/status-code.type";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { UserEmailDTO } from "../../user/dto/user-email.dto";
import { UserLoginDto } from "../../user/dto/user-login.dto";
import { NewPasswords } from "../../user/dto/new-passwords.dto";

const authenticationService = new AuthenticationService();

class AuthenticationController {
  async register(request: Request, response: Response) {
    const userData = request.body as CreateUserDto;
    try {
      await authenticationService.register(userData);
      return response.status(StatusCode.CREATED).json({
        message: "Criado com sucesso",
        statuscode: StatusCode.CREATED,
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
      return response.sendStatus(StatusCode.SUCCESS);
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }

  async newPassword(request: Request, response: Response) {
    const newPasswords = request.body as NewPasswords;
    try {
      const newPassword = await authenticationService.newPassword(newPasswords);
      return response.status(StatusCode.SUCCESS).json({
        newPassword,
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
