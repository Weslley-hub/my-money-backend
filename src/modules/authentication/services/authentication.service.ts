import  {v4 as generatoUuidId} from "uuid";
import { BusinessException } from "../../api/exceptions/business.exception";
import { NotFoundException } from "../../api/exceptions/not-found.exception";
import { CreateUserDto, CreateUserLogin, CreateUserRecoveryPassword } from "../../user/dto/create-user.dto";
import { UserRepository } from "../../user/repositories/user.repository";
import { UserValidationSchema,UserValidationLogin, UserValidationRecoveryPassword } from "../../user/validation/user.schema";

const userRepository = new UserRepository();
function gerarPassword() {
    return Math.random().toString(36).slice(-10);
}

class AuthenticationService{
    async register(userData:CreateUserDto){

        await UserValidationSchema.validate(userData,{
            abortEarly:false,
        });
        const existingUserWithEmail = await userRepository.findByEmail(userData.email)
        console.log(existingUserWithEmail);
        if(existingUserWithEmail){
            throw new BusinessException(
                `Ja existe um usuario cadastrado com o e-mail: ${userData.email}`
            );
        }

            const userId = generatoUuidId();
            await userRepository.save({
                id: userId,
                name: userData.name,
                email: userData.email,
                password:userData.password,
                avatar:userData.avatar,
            })
    }
    async login(userLogin:CreateUserLogin){
        await UserValidationLogin.validate(userLogin,{
            abortEarly:false,
        });

        const existingUserWithEmail = await userRepository.findByEmail(userLogin.email);

        if(existingUserWithEmail){
            console.log("User login - ",userLogin);
            console.log("O usuario tem um email no sistema");
            const idUserLogin = await userRepository.verificationEmailPassword(userLogin.email,userLogin.password);
            if(idUserLogin.length != 0){
                console.log("Id do usuario",idUserLogin);    
                //return response.status(200).json({message:"Logado com sucesso"});
            }
            else{
                throw new BusinessException(
                    "Acesso não autorizado, dados de login incorretos"
                );
            }
        }
        else{
            throw new NotFoundException(
                `Não foi encontrado usuario com o e-mail: ${userLogin.email}`
            );
        }
    }
    async passwordRecovery(userEmail: CreateUserRecoveryPassword){
        await UserValidationRecoveryPassword.validate(userEmail);
        console.log("userEmail - ",userEmail.email)
        const existingUserWithEmail = await userRepository.findByEmail(userEmail.email)
        console.log("existingUserWithEmail - ",existingUserWithEmail);
        //acredito que nao seja uma boa pratica passar todos os dados do user...
        if(existingUserWithEmail){
            //crio a nova senha
            const password = gerarPassword();
            console.log("Nova senha - ", password);
            existingUserWithEmail.password = password;
            const updateSenha = await userRepository.update(existingUserWithEmail)
            if(updateSenha){
                console.log("Senha criada com sucesso")
            }
            else{
                throw new BusinessException("Não foi possivel atualizar a senha");
            }
        }
        else{
            //email não existe no banco preciso retornar erro
            throw new NotFoundException(`Não existe usuario com o email ${userEmail.email}`);
        }
    }
}
export {AuthenticationService}