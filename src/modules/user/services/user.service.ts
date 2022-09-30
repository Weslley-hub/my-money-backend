import { v4 as uuidV4 } from "uuid";
import { ExceptionHandler } from "../../api/exception-handler/ExceptionHandler";
import { BusinessException } from "../../api/exceptions/Business.exception";
import { NotFoundException } from "../../api/exceptions/NotFound.exception";
import { ApiResponse } from "../../api/types/api-response.model";
import { StatusCode } from "../../api/types/status-code.type";

import { CreateUserDto } from "../dto/create-user.dto";
import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export type UpdateUserProps = {
  id: string;
  data: CreateUserDto;
};

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async save(user: CreateUserDto): Promise<ApiResponse<null>> {
    const userId = uuidV4();

    try {
      const userWithSameEmail = await this.userRepository.findByEmail(
        user.email
      );

      if (userWithSameEmail) {
        throw new BusinessException(
          `Já existe um usuário cadastro com ${user.email}`
        );
      }

      const userWithUuid: UserModel = {
        ...user,
        id: userId,
      };

      await this.userRepository.save(userWithUuid);

      return {
        message: "Usuário cadastrado com sucesso",
        statusCode: StatusCode.CREATED,
      };
    } catch (error) {
      return ExceptionHandler.parseErrorToApiResponse(error as Error);
    }
  }

  async findById(id: string): Promise<ApiResponse<null | UserModel>> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }

    return {
      statusCode: StatusCode.SUCCESS,
      data: userFound,
    };
  }

  async delete(id: string): Promise<ApiResponse<null | UserModel>> {
    try {
      const userFound = await this.userRepository.findById(id);

      if (!userFound) {
        throw new NotFoundException(
          `Não existe usuário cadastrado com ID ${id}`
        );
      }

      await this.userRepository.delete(id);

      return {
        statusCode: StatusCode.SUCCESS,
      };
    } catch (error) {
      return ExceptionHandler.parseErrorToApiResponse(error as Error);
    }
  }

  private async verifyUsersWithSameEmail(
    email: string,
    userInVerificationId: string
  ) {
    const usersWithSameEmail = await this.userRepository.findAllByEmail(email);

    if (usersWithSameEmail.length === 0) {
      return;
    }

    if (usersWithSameEmail.length > 1) {
      throw new BusinessException(`Já existe um usuário cadastro com ${email}`);
    }

    if (usersWithSameEmail[0].id !== userInVerificationId) {
      throw new BusinessException(`Já existe um usuário cadastro com ${email}`);
    }
  }

  async update(
    updateUserProps: UpdateUserProps
  ): Promise<ApiResponse<null | UserModel>> {
    const { id, data } = updateUserProps;

    try {
      const userFound = await this.userRepository.findById(id);

      if (!userFound) {
        throw new NotFoundException(
          `Não existe usuário cadastrado com ID ${id}`
        );
      }

      await this.verifyUsersWithSameEmail(data.email, id);
      await this.userRepository.update({
        ...data,
        id,
      });

      return {
        statusCode: StatusCode.SUCCESS,
      };
    } catch (error) {
      return ExceptionHandler.parseErrorToApiResponse(error as Error);
    }
  }
}

const userService = new UserService();
export { userService };
