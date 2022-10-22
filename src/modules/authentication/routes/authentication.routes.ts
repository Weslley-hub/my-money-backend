import {Router} from "express";
import * as Yup from "yup";
import { dbConnection } from "../../../database";
import { UserModel } from "../../user/models/user.model";
import { UserValidationSchema } from "../../user/validation/user.schema";
import express, {Request, Response} from "express";
import  {v4 as generatoUuidId} from "uuid";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { AuthenticationController } from "../controllers/authentication.controllers";
import { UserRepository } from "../../user/repositories/user.repository";

const userRepository = new UserRepository;

const UserValidationLogin = Yup.object().shape({
    email: Yup.string()
      .email("email deve ser válido")
      .required("E-mail é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
  });

type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    avatar: string;
};
const authRoutes = Router();
const authenticationController = new AuthenticationController;

authRoutes.post("/register", authenticationController.register);

authRoutes.post("/login", async (req,res)=>{
    const userLogin = req.body;
    await UserValidationLogin.validate(userLogin,{
        abortEarly:false,
    });

    const existingUserWithEmail = await userRepository.findByEmail(userLogin.email);
    if(existingUserWithEmail){
        console.log("User login - ",userLogin);
        const idUserLogin = await dbConnection("users")
            .where({
                email: userLogin.email,
                password: userLogin.password
            }).select("id");
        if(idUserLogin.length != 0){
            console.log("Id do usuario",idUserLogin);    
        }
        else{
            return res.status(401).json({message:"Acesso não autorizado, dados de login errados."});
        }
        console.log("O usuario tem um email no sistema");
        return res.status(200).json({message:"O usuario tem um email no sistema"});
    }
    else{
        return res.status(404).json({message:`Error: não foi encontrado usuario com email ${userLogin.email}`})
    }

});
authRoutes.post("/login", async (req,res)=>{
    
});


export {authRoutes};