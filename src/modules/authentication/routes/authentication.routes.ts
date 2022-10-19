import {Router} from "express"
import { dbConnection } from "../../../database";
import { UserModel } from "../../user/models/user.model";
import { UserValidationSchema } from "../../user/validation/user.schema";
import express, {Request, Response} from "express";
import  {v4 as generatoUuidId} from "uuid";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { AuthenticationController } from "../controllers/authentication.controllers";

type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    avatar: string;
};
const authRoutes = Router();
const authenticationController = new AuthenticationController;
authRoutes.post("/register", authenticationController.register);

export {authRoutes};