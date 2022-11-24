import { Router } from "express";
import { CardController } from "../controllers/cards.controllers";

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post("/register", cardController.register);
cardRouter.post("/", cardController.list);
cardRouter.delete("/", cardController.delete);
cardRouter.put("/", cardController.update);

export { cardRouter };
