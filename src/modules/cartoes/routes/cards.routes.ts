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

cardRouter.post("/current-user-cards", async (req, res) => {
  const { id } = req.body;
  const cardRepository = new CardRepository();
  const cartoes = await cardRepository.findAllByUserId(id);
  return res.status(200).json({ cartoes });
});

cardRouter.post("/delete", async (req, res) => {
  const cardData = req.body as DeleteCardDto;
  const cardRepository = new CardRepository();
  await CardValidationDelete.validate(cardData);

  const existingCardById = await cardRepository.findById(cardData.id);
  console.log("existingCardById - ", existingCardById);
  if (!existingCardById) {
    return res.status(400).json("Não existe um cartão com esse id.");
  }

  await cardRepository.delete(cardData.id);
  return res.status(200).json({ message: "Cartão excluido" });
});

cardRouter.post("/update", async (req, res) => {
  const cardData = req.body as RepositoryCardDto;
  await CardValidationUpdate.validate(cardData);
  console.log(cardData);
  const cardRepository = new CardRepository();
  const existingCardById = await cardRepository.findById(cardData.id);
  console.log("existingCardById - ", existingCardById);
  if (!existingCardById) {
    return res.status(400).json("Não existe um cartão com esse id.");
  }
  await cardRepository.update(cardData);
  return res.status(200).json({ message: "Cartão foi atualizado" });
});

export { cardRouter };
