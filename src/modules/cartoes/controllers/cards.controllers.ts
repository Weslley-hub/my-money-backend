import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { StatusCode } from "../../api/types/status-code.type";
import { CreateCardDto } from "../dto/create-cards.dto";
import { DeleteCardDto } from "../dto/delete-cards.dto";
import { RepositoryCardDto } from "../dto/repository-cards.dto";

import { CardsService } from "../services/card.service";

const cardsService = new CardsService();

class CardController {
  async register(request: Request, response: Response) {
    try {
      return await this.tryRegister(request, response);
    } catch (error) {
      const apiErrorResponse = await this.cathPattern(error, response);
      return apiErrorResponse;
    }
  }

  private async tryRegister(request: Request, response: Response) {
    const cardData = request.body as CreateCardDto;
    await cardsService.register(cardData);
    return response.status(StatusCode.CREATED).json({
      message: "Criado com sucesso",
      statuscode: StatusCode.CREATED,
    });
  }

  private async cathPattern(error: unknown, response: Response) {
    const apiErrorResponse =
      ExceptionHandler.parseErrorAndGetApiResponse(error);

    return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
  }

  async list(request: Request, response: Response) {
    try {
      return await this.tryList(request, response);
    } catch (error) {
      const apiErrorResponse = await this.cathPattern(error, response);
      return apiErrorResponse;
    }
  }

  private async tryList(request: Request, response: Response) {
    const cardId = request.body as string;
    const cards = await cardsService.list(cardId);
    return response.status(StatusCode.SUCCESS).json({ cards });
  }

  async delete(request: Request, response: Response) {
    try {
      return await this.tryDelete(request, response);
    } catch (error) {
      const apiErrorResponse = await this.cathPattern(error, response);
      return apiErrorResponse;
    }
  }

  private async tryDelete(request: Request, response: Response) {
    const cardId = request.body as string;
    await cardsService.delete(cardId);
    return response.status(200).json({ message: "Cartão excluido" });
  }

  async update(request: Request, response: Response) {
    try {
      return await this.tryUpdate(request, response);
    } catch (error) {
      const apiErrorResponse = await this.cathPattern(error, response);
      return apiErrorResponse;
    }
  }

  private async tryUpdate(request: Request, response: Response) {
    const cardData = request.body as RepositoryCardDto;
    await cardsService.update(cardData);
    return response.status(200).json({ message: "Cartão foi atualizado" });
  }
}

export { CardController };
