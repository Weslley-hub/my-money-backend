import {Router} from "express";
import * as Yup from "yup";
import { dbConnection } from "../../../database";
import { UserModel } from "../../user/models/user.model";
import { UserValidationSchema } from "../../user/validation/user.schema";
import express, {Request, Response} from "express";
import  {v4 as generatoUuidId} from "uuid";
import { CreateUserDto, CreateUserRecoveryPassword } from "../../user/dto/create-user.dto";
import { AuthenticationController } from "../controllers/authentication.controllers";
import { UserRepository } from "../../user/repositories/user.repository";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { BusinessException } from "../../api/exceptions/business.exception";

const userRepository = new UserRepository;

type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    avatar: string;
};
const authRoutes = Router();
const authenticationController = new AuthenticationController;

authRoutes.post("/register", authenticationController.register);
authRoutes.post("/login", authenticationController.login);
authRoutes.post("/recoverypassword", authenticationController.passwordRecovery);


export {authRoutes};