import { Router } from "express";
import { CardController } from "../controllers/cards.controllers";

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post("/register", cardController.register);
cardRouter.post("/current-user-cards", cardController.userCardList);
cardRouter.post("/delete", cardController.delete);
cardRouter.post("/update", cardController.update);

export { cardRouter };
