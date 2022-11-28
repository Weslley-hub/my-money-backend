import { Router } from "express";

import { authenticationMiddleware } from "../../security/middlewares";
import { CardController } from "../controllers";

const creditCardRouter = Router();
const cardController = new CardController();

creditCardRouter.post(
  "/",
  authenticationMiddleware,
  cardController.register.bind(cardController)
);
creditCardRouter.get(
  "/",
  authenticationMiddleware,
  cardController.list.bind(cardController)
);
creditCardRouter.get(
  "/uniqueListing",
  authenticationMiddleware,
  cardController.uniqueListing.bind(cardController)
);
creditCardRouter.delete(
  "/",
  authenticationMiddleware,
  cardController.delete.bind(cardController)
);
creditCardRouter.put(
  "/",
  authenticationMiddleware,
  cardController.update.bind(cardController)
);

export { creditCardRouter };
