import { v4 as generatoUuidId } from "uuid";
import { BusinessException } from "../../api/exceptions/business.exception";
import { NotFoundException } from "../../api/exceptions/not-found.exception";
import { UserPasswordService } from "../../security/services/user-password.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { RecoveryPasswordDataDto } from "../../user/dto/recovery-data.dto";
import { UserLoginDto } from "../../user/dto/user-login.dto";
import { UserOutputDto } from "../../user/dto/user-output.dto";
import { UserRepository } from "../../user/repositories/user.repository";
import {
  UserValidationSchema,
  UserValidationLogin,
  UserValidationRecoveryPassword,
} from "../../user/validation/user.schema";

const userRepository = new UserRepository();

class AuthenticationService {
  async register(userData: CreateUserDto) {
    userData.password = UserPasswordService.encryptPassword(userData.password);
    await UserValidationSchema.validate(userData, {
      abortEarly: false,
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
      avatar: userData.avatar,
    });
    console.log("senha incriptada no registro -", userData.password);
  }
  async login(userLogin: UserLoginDto): Promise<UserOutputDto> {
    userLogin.password = UserPasswordService.encryptPassword(
      userLogin.password
    );
    await UserValidationLogin.validate(userLogin, {
      abortEarly: false,
    });

    const existingUserWithEmail = await userRepository.findByEmail(
      userLogin.email
    );

    if (existingUserWithEmail) {
      const userData = await userRepository.verificationEmailPassword(
        userLogin.email,
        userLogin.password
      );
      if (userData) {
        console.log("Id do usuario", userData);
        console.log("senha incriptada no login -", userData.password);
        return {
          avatar: userData.avatar,
          email: userData.email,
          id: userData.id,
          name: userData.name,
        };
        //return response.status(200).json({message:"Logado com sucesso"});
      } else {
        throw new BusinessException(
          "Acesso não autorizado, dados de login incorretos"
        );
      }
    } else {
      throw new NotFoundException(
        `Não foi encontrado usuario com o e-mail: ${userLogin.email}`
      );
    }
  }
  async passwordRecovery(userEmail: RecoveryPasswordDataDto) {
    await UserValidationRecoveryPassword.validate(userEmail);
    const existingUserWithEmail = await userRepository.findByEmail(
      userEmail.email
    );
    if (existingUserWithEmail) {
      //crio a nova senha
      const password = UserPasswordService.generateRandomPassword();
      existingUserWithEmail.password =
        UserPasswordService.encryptPassword(password);
      const updatePassword = await userRepository.update(existingUserWithEmail);
      if (updatePassword) {
        console.log("Senha criada com sucesso - ", password);
        return password;
      } else {
        throw new BusinessException("Não foi possivel atualizar a senha");
      }
    } else {
      //email não existe no banco preciso retornar erro
      throw new NotFoundException(
        `Não existe usuario com o email ${userEmail.email}`
      );
    }
  }
}
export { AuthenticationService };
