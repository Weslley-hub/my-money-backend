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
    try {
      const cardData = request.body as CreateCardDto;
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
    try {
      const cardData = request.body as UserCardList;
      const cartoes = await cardsService.userCardList(cardData);
      return response.status(200).json({ cartoes });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const cardData = request.body as DeleteCardDto;
      await cardsService.delete(cardData);
      return response.status(200).json({ message: "Cartão excluido" });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const cardData = request.body as RepositoryCardDto;
      await cardsService.update(cardData);
      return response.status(200).json({ message: "Cartão foi atualizado" });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { CardController };
