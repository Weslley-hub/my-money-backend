import { request, response } from "express";
import  {v4 as generatoUuidId} from "uuid";
import { dbConnection } from "../../../database";
import { BusinessException } from "../../api/exceptions/business.exception";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UserModel } from "../../user/models/user.model";
import { UserRepository } from "../../user/repositories/user.repository";
import { UserValidationSchema } from "../../user/validation/user.schema";

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
}
export {AuthenticationService}