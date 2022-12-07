import { NotFoundException, BusinessException } from "../../api/exception";
import {
  CreateUserDto,
  UpdateUserDto,
  UserOutputDto,
  UserRepositoryDto
} from "../dto";
import { UserRepository } from "../repositories";
import { UserValidationSchema } from "../validation";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async update(updateUserProps: UpdateUserDto): Promise<void> {
    const { id, data } = updateUserProps;

    await this.validateUserData(data);
    await this.verifyUserExistenceAndThrowExceptionIfDoesntExists(id);
    await this.verifyExistenceOfUsersWithSameEmail(data.email, id);

    await this.userRepository.update({
      avatar: data.avatar,
      email: data.email,
      name: data.name,
      password: data.password,
      id
    });
  }

  async verifyUserExistenceAndThrowExceptionIfDoesntExists(userId: string) {
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

  private convertUserModelToUserOutputDto(
    userModal: CreateUserDto
  ): UserOutputDto {
    return {
      name: userModal.name,
      email: userModal.email,
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
