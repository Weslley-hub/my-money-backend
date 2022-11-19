import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { StatusCode } from "../../api/types/status-code.type";
import { CreateCardDto } from "../dto/create-cards.dto";
import { DeleteCardDto } from "../dto/delete-cards.dto";
import { RepositoryCardDto } from "../dto/repository-cards.dto";
import { UserCardList } from "../dto/user-card-list-dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardsService } from "../services/cards.service";
import { CardValidationDelete } from "../validation/card.validation.delete";
import { CardValidationUpdate } from "../validation/card.validation.update";
import { UserCardListValidation } from "../validation/user.card.list.validation";

const cardsService = new CardsService();

class CardController {
  async register(request: Request, response: Response) {
    const cardData = request.body as CreateCardDto;
    try {
      await cardsService.register(cardData);
      return response.status(StatusCode.CREATED).json({
        message: "Criado com sucesso",
        statuscode: StatusCode.CREATED,
      });
    } catch (error) {
      console.log("error - ", error);
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);
      console.log("statuscode - ", apiErrorResponse.statusCode);
      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }

  async userCardList(request: Request, response: Response) {
    const cardData = request.body as UserCardList;
    await UserCardListValidation.validate(cardData);
    const cardRepository = new CardRepository();
    const cartoes = await cardRepository.findAllByUserId(cardData.id);
    return response.status(200).json({ cartoes });
  }

  async delete(request: Request, response: Response) {
    const cardData = request.body as DeleteCardDto;
    const cardRepository = new CardRepository();
    await CardValidationDelete.validate(cardData);

    const existingCardById = await cardRepository.findById(cardData.id);
    console.log("existingCardById - ", existingCardById);
    if (!existingCardById) {
      return response.status(400).json("Não existe um cartão com esse id.");
    }

    await cardRepository.delete(cardData.id);
    return response.status(200).json({ message: "Cartão excluido" });
  }

  async update(request: Request, response: Response) {
    const cardData = request.body as RepositoryCardDto;
    await CardValidationUpdate.validate(cardData);
    console.log(cardData);
    const cardRepository = new CardRepository();
    const existingCardById = await cardRepository.findById(cardData.id);
    console.log("existingCardById - ", existingCardById);

    if (!existingCardById) {
      return response.status(400).json("Não existe um cartão com esse id.");
    }

    await cardRepository.update(cardData);
    return response.status(200).json({ message: "Cartão foi atualizado" });
  }
}

export { CardController };
