import { CreateUserDto, CreateUserLogin, CreateUserRecoveryPassword } from "../../user/dto/create-user.dto";
import {Request, Response} from "express";
import { AuthenticationService } from "../services/authentication.service";
import { StatusCode } from "../../api/types/status-code.type";
import {ExceptionHandler} from "../../api/exception-handler/exception.handler"
import { UserRepository } from "../../user/repositories/user.repository";


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
        const userLogin = request.body as CreateUserLogin;

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
    
    async passwordRecovery(request: Request, response: Response){
        const userEmail = request.body as CreateUserRecoveryPassword;
        console.log(userEmail);
        try {
            await authenticationService.passwordRecovery(userEmail);
            return response.status(StatusCode.SUCCESS)
                .json({message:"Nova senha gerada com sucesso",
                statuscode: StatusCode.SUCCESS});
        }catch (error) {
            const apiErrorResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
            return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
        }
    }
}

    export {AuthenticationController};