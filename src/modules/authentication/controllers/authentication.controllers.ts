import { dbConnection } from "../../../database";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UserModel } from "../../user/models/user.model";
import { UserValidationSchema } from "../../user/validation/user.schema";
import {Request, Response} from "express";
import {v4 as generatoUuidId} from "uuid";
import { AuthenticationService } from "../services/authentication.service";
import { StatusCode } from "../../api/types/status-code.type";
import {ExceptionHandler} from "../../api/exception-handler/exception.handler"
import { UserRepository } from "../../user/repositories/user.repository";
import * as Yup from "yup";


const authenticationService = new AuthenticationService();
const userRepository = new UserRepository;

class AuthenticationController {
    async register(request: Request, response: Response){

    const userData = request.body as CreateUserDto;

        try {
            await authenticationService.register(userData);
            return response.status(StatusCode.CREATED)
                .json({message:"Criado com sucesso",
                    statuscode:StatusCode.CREATED})
        } catch (error) {
            const apiErrorResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
            return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
            
        }
    }
    async login(request: Request, response: Response){
        const userLogin = request.body;

        try {
            await authenticationService.login(userLogin);
            return response.status(StatusCode.SUCCESS)
                .json({message:"Login com sucesso",
                statuscode: StatusCode.SUCCESS});
        } catch (error) {
            const apiErrorResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
            return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
        }
        
    }
}

    export {AuthenticationController};