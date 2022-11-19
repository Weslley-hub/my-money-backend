import { Router } from "express";
import { CardController } from "../controllers/cards.controllers";
import { DeleteCardDto } from "../dto/delete-cards.dto";
import { RepositoryCardDto } from "../dto/repository-cards.dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardValidationDelete } from "../validation/card.validation.delete";
import { CardValidationUpdate } from "../validation/card.validation.update";

const cardRouter = Router();
const cardController = new CardController();
cardRouter.post("/register", cardController.register);

cardRouter.post("/current-user-cards", cardController.userCardList);

cardRouter.post("/delete", cardController.delete);

cardRouter.post("/update", cardController.update);

export { cardRouter };
