import { Request, Response } from "express";

import { CreateUserDto } from "../dto/create-user.dto";
import { userService } from "../services/user.service";

class UserController {
  async save(request: Request, response: Response) {
    const userData = request.body as CreateUserDto;
    const apiResponse = await userService.save(userData);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async findById(request: Request, response: Response) {
    const userId = request.params.userId as string;
    const apiResponse = await userService.findById(userId);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async delete(request: Request, response: Response) {
    const userId = request.params.userId as string;
    const apiResponse = await userService.delete(userId);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }

  async update(request: Request, response: Response) {
    const userId = request.params.userId as string;
    const userData = request.body as CreateUserDto;

    const apiResponse = await userService.update({
      id: userId,
      data: userData,
    });
    return response.status(apiResponse.statusCode).json(apiResponse);
  }
}

const userController = new UserController();
export { userController };
