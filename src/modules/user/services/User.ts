import { BusinessException } from "../../api/exception/Business";
import { NotFoundException } from "../../api/exception/NotFound";

import { CreateUserDto } from "../dto/CreateUser";
import { UserOutputDto } from "../dto/UserOutput";
import { UserModel } from "../models/User";
import { UserRepository } from "../repositories/User";
import { UserValidationSchema } from "../validation/user.schema";

export type UpdateUserProps = {
  id: string;
  data: CreateUserDto;
};

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async update(updateUserProps: UpdateUserProps): Promise<void> {
    const { id, data } = updateUserProps;

    await this.validateUserData(data);
    await this.verifyUserExistence(id);
    await this.verifyExistenceOfUsersWithSameEmail(data.email, id);

    await this.userRepository.update({
      avatar: data.avatar,
      email: data.email,
      name: data.name,
      password: data.password,
      id
    });
  }

  async verifyUserExistence(userId: string) {
    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
      throw new NotFoundException(
        `Não existe usuário cadastrado com ID ${userId}`
      );
    }
  }

  private async verifyExistenceOfUsersWithSameEmail(
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

  async validateUserData(user: CreateUserDto) {
    await UserValidationSchema.validate(user, { abortEarly: false });
  }

  async findById(id: string): Promise<UserOutputDto> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }

    const userOutputDto = this.convertUserModelToUserOutputDto(userFound);
    return userOutputDto;
  }

  private convertUserModelToUserOutputDto(userModal: UserModel): UserOutputDto {
    return {
      name: userModal.name,
      email: userModal.email,
      password: userModal.password,
      avatar: userModal.avatar
    };
  }

  async delete(id: string): Promise<void> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }

    await this.userRepository.delete(id);
  }
}
