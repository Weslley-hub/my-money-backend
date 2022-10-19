import { dbConnection } from "../../../database";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { UserModel } from "../../user/models/user.model";
import { UserValidationSchema } from "../../user/validation/user.schema";
import {Request, Response} from "express";
import {v4 as generatoUuidId} from "uuid";
import { AuthenticationService } from "../services/authentication.service";
import { StatusCode } from "../../api/types/status-code.type";
import {ExceptionHandler} from "../../api/exception-handler/exception.handler"

const authenticationService = new AuthenticationService();

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



    try {
        await UserValidationSchema.validate(userData,{
            abortEarly:false,
        });
    } catch (error) {
        return response.status(400)
        .json({message: "Dados Invalidos",error:error});
    }
 
    try {
        
    } catch (error) {

    }
    try {

    } catch (error) {
        return response.status(400).json({message: "Erro ao salvar usuário"})
    }
}
    }

    export {AuthenticationController};