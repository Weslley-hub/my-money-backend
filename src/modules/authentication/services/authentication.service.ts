import { request, response } from "express";
import  {v4 as generatoUuidId} from "uuid";
import { dbConnection } from "../../../database";
import { BusinessException } from "../../api/exceptions/business.exception";
import { CreateUserDto, CreateUserLogin } from "../../user/dto/create-user.dto";
import { UserModel } from "../../user/models/user.model";
import { UserRepository } from "../../user/repositories/user.repository";
import { UserValidationSchema,UserValidationLogin } from "../../user/validation/user.schema";
import * as Yup from "yup";
const userRepository = new UserRepository();

class AuthenticationService{
    async register(userData:CreateUserDto){

        await UserValidationSchema.validate(userData,{
            abortEarly:false,
        });
        const existingUserWithEmail = await userRepository.findByEmail(userData.email)

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
            throw new BusinessException(
                `Não foi encontrado usuario com o e-mail: ${userLogin.email}`
                //preciso retornar statuscode 404 aqui e não 400
            );
        }
    }
}
export {AuthenticationService}