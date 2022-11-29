import { Router } from "express";

import { authenticationMiddleware } from "../../security/middlewares";
import { CardController } from "../controllers";

const debitCardRouter = Router();
const cardController = new CardController();

debitCardRouter.post(
  "/",
  authenticationMiddleware,
  cardController.register.bind(cardController)
);
debitCardRouter.get(
  "/",
  authenticationMiddleware,
  cardController.list.bind(cardController)
);
debitCardRouter.get(
  "/uniqueListing",
  authenticationMiddleware,
  cardController.uniqueListing.bind(cardController)
);
debitCardRouter.delete(
  "/",
  authenticationMiddleware,
  cardController.delete.bind(cardController)
);
debitCardRouter.put(
  "/",
  authenticationMiddleware,
  cardController.update.bind(cardController)
);

export { debitCardRouter };
