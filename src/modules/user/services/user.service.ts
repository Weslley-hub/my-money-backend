import { v4 as uuidV4 } from "uuid";
import { BusinessException } from "../../api/exceptions/business.exception";
import { NotFoundException } from "../../api/exceptions/not-found.exception";

import { CreateUserDto } from "../dto/create-user.dto";
import { UserModel } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { UserValidationSchema } from "../validation/user.schema";
import { UserPasswordService } from "./user-password.service";

export type UpdateUserProps = {
  id: string;
  data: CreateUserDto;
};

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async save(user: CreateUserDto): Promise<void> {
    const userId = uuidV4();
    await this.validateUserData(user);
    await this.verifyEmailAvailability(user.email);

    const encryptedPassword = UserPasswordService.encryptPassword(
      user.password
    );

    const userWithUuid: UserModel = {
      id: userId,
      name: user.name,
      email: user.email,
      password: encryptedPassword,
      avatar: user.avatar,
    };

    await this.userRepository.save(userWithUuid);
  }

  private async verifyEmailAvailability(email: string) {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new BusinessException(`Já existe um usuário cadastro com ${email}`);
    }
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
      id,
    });
  }

  private async verifyUserExistence(userId: string) {
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

  async findById(id: string): Promise<UserModel> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }

    return userFound;
  }

  async delete(id: string): Promise<void> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }

    await this.userRepository.delete(id);
  }
}
