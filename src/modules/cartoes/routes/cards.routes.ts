import { Router } from "express";
import { CardController } from "../controllers/cards.controllers";
import { CardRepository } from "../repositories/cards.repository";

const cardRouter = Router();
const cardController = new CardController();
cardRouter.post("/register", cardController.registerCard);
cardRouter.post("/current-user-cards", async (req, res) => {
  const { id } = req.body;
  const cardRepository = new CardRepository();
  const cartoes = await cardRepository.findAllByUserId(id);
  return res.status(200).json({ cartoes });
});
cardRouter.post("/delete", async (req, res) => {
  const { id } = req.body;
  const cardRepository = new CardRepository();
  await cardRepository.delete(id);
  return res.status(200).json({ message: "Cartão excluido" });
});
cardRouter.post("/update", async (req, res) => {
  const { id } = req.body;
  const cardRepository = new CardRepository();
  //terminar essa parte dia 18/11

  //await cardRepository.update();
  return res.status(200).json({ message: "Cartão excluido" });
});

export { cardRouter };
