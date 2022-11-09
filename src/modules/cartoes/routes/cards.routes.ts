import { Router } from "express";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { BusinessException } from "../../api/exceptions/business.exception";
import { StatusCode } from "../../api/types/status-code.type";
import { CardController } from "../controllers/cards.controllers";
import { CreateCardDto } from "../dto/create-cards.dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardValidationSchema } from "../validation/cards.schema";

const cardRouter = Router();
const cardRepository = new CardRepository();
const cardController = new CardController();
cardRouter.post("/register-card", cardController.registerCard);

export { cardRouter };
