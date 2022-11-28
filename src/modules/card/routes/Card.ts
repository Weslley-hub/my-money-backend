import { Router } from "express";

import { authenticationMiddleware } from "../../security/middlewares";
import { CardController } from "../controllers";

const cardRouter = Router();
const cardController = new CardController();

cardRouter.post(
  "/register",
  authenticationMiddleware,
  cardController.register.bind(cardController)
);
cardRouter.get(
  "/",
  authenticationMiddleware,
  cardController.list.bind(cardController)
);
cardRouter.get(
  "/uniqueListing",
  authenticationMiddleware,
  cardController.uniqueListing.bind(cardController)
);
cardRouter.delete(
  "/",
  authenticationMiddleware,
  cardController.delete.bind(cardController)
);
cardRouter.put(
  "/",
  authenticationMiddleware,
  cardController.update.bind(cardController)
);

export { cardRouter };
