import { v4 as generatoUuidId } from "uuid";
import {
  BusinessException,
  NotFoundException,
  InternalServerErrorException
} from "../../api/exception";

import { UserPasswordService, JwtService } from "../../security/services";

import {
  CreateUserDto,
  UserLoginDto,
  UserEmailDTO,
  NewPasswordsDto
} from "../../user/dto";
import { UserRepository } from "../../user/repositories";
import {
  UserValidationSchema,
  UserValidationLogin,
  UserValidationEmail,
  UserValidationNewPasswords
} from "../../user/validation";

import { LoginOutputDto } from "../dto/LoginOutput";

const userRepository = new UserRepository();

class AuthenticationService {
  async register(userData: CreateUserDto) {
    userData.password = UserPasswordService.encryptPassword(userData.password);
    await UserValidationSchema.validate(userData, {
      abortEarly: false
    });
    const existingUserWithEmail = await userRepository.findByEmail(
      userData.email
    );
    if (existingUserWithEmail) {
      throw new BusinessException(
        `Ja existe um usuario cadastrado com o e-mail: ${userData.email}`
      );
    }

    const userId = generatoUuidId();
    await userRepository.save({
      id: userId,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar
    });
  }

  async login(userLogin: UserLoginDto): Promise<LoginOutputDto> {
    userLogin.password = UserPasswordService.encryptPassword(
      userLogin.password
    );
    await UserValidationLogin.validate(userLogin, {
      abortEarly: false
    });

    const existingUserWithEmail = await userRepository.findByEmail(
      userLogin.email
    );

    if (!existingUserWithEmail) {
      throw new NotFoundException(
        `Não foi encontrado usuario com o e-mail: ${userLogin.email}`
      );
    }

    const userData = await userRepository.verificationEmailPassword(
      userLogin.email,
      userLogin.password
    );

    if (!userData) {
      throw new BusinessException(
        "Acesso não autorizado, dados de login incorretos"
      );
    }

    const jwtToken = JwtService.generateAccessToken(userData.id);

    return {
      token: jwtToken,
      data: {
        avatar: userData.avatar,
        email: userData.email,
        name: userData.name,
        password: userData.password
      }
    };
  }

  async confirmEmail(userEmail: UserEmailDTO) {
    await UserValidationEmail.validate(userEmail);
    const existingUserWithEmail = await userRepository.findByEmail(
      userEmail.email
    );
    if (existingUserWithEmail) {
      return existingUserWithEmail;
    } else {
      throw new NotFoundException(
        `Não existe usuario com o email ${userEmail.email}`
      );
    }
  }

  async newPassword(newPasswords: NewPasswordsDto /*userEmail: UserEmailDTO*/) {
    await UserValidationNewPasswords.validate(newPasswords);

    if (newPasswords.newPassword == newPasswords.confirmNewPassword) {
      const userData = await userRepository.findByEmail(newPasswords.email);
      if (userData) {
        userData.password = UserPasswordService.encryptPassword(
          newPasswords.newPassword
        );
        const updatePasswordUser = await userRepository.update(userData);
        if (!updatePasswordUser) {
          throw new InternalServerErrorException(
            "Não foi possivel atualizar a senha"
          );
        }
      }
    } else {
      throw new BusinessException("As senhas são diferentes");
    }
  }
}
export { AuthenticationService };
