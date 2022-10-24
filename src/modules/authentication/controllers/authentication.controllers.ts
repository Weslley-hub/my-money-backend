import { CreateUserDto } from "../../user/dto/create-user.dto";
import { Request, Response } from "express";
import { AuthenticationService } from "../services/authentication.service";
import { StatusCode } from "../../api/types/status-code.type";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { RecoveryPasswordDataDto } from "../../user/dto/recovery-data.dto";
import { UserLoginDto } from "../../user/dto/user-login.dto";

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

  async passwordRecovery(request: Request, response: Response) {
    const userEmail = request.body as RecoveryPasswordDataDto;
    try {
      const newPassword = await authenticationService.passwordRecovery(
        userEmail
      );
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
