import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { StatusCode } from "../../api/types/status-code.type";
import { ApiResponseGenerator } from "../../api/util/ApiReponseGenerator.util";

import { CreateUserDto } from "../dto/create-user.dto";
import { userService } from "../services/user.service";

class UserController {
  async save(request: Request, response: Response) {
    const userData = request.body as CreateUserDto;

    try {
      await userService.save(userData);
      const apiResponse = ApiResponseGenerator.generateResponse<null>({
        message: "Usuário cadastro com sucesso",
        statusCode: StatusCode.CREATED,
      });
      return response.status(StatusCode.CREATED).json(apiResponse);
    } catch (error) {
      const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response.status(apiResponse.statusCode).json(apiResponse);
    }
  }

  async findById(request: Request, response: Response) {
    const userId = request.params.userId as string;

    try {
      const foundUser = await userService.findById(userId);
      return response.status(200).json(foundUser);
    } catch (error) {
      const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response.status(apiResponse.statusCode).json(apiResponse);
    }
  }

  async delete(request: Request, response: Response) {
    const userId = request.params.userId as string;

    try {
      await userService.delete(userId);
      const apiResponse = ApiResponseGenerator.generateResponse<null>({
        message: "Usuário excluído com sucesso",
        statusCode: StatusCode.SUCCESS,
      });
      return response.status(StatusCode.SUCCESS).json(apiResponse);
    } catch (error) {
      const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response.status(apiResponse.statusCode).json(apiResponse);
    }
  }

  async update(request: Request, response: Response) {
    const userId = request.params.userId as string;
    const userData = request.body as CreateUserDto;

    try {
      const userDataToUpdate = {
        id: userId,
        data: userData,
      };

      const apiResponse = ApiResponseGenerator.generateResponse<null>({
        message: "Usuário atualizado com sucesso",
        statusCode: StatusCode.SUCCESS,
      });
      await userService.update(userDataToUpdate);

      return response.status(StatusCode.SUCCESS).json(apiResponse);
    } catch (error) {
      const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
      return response.status(apiResponse.statusCode).json(apiResponse);
    }
  }
}

const userController = new UserController();
export { userController };
