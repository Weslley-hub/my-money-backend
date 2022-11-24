import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { StatusCode } from "../../api/types/status-code.type";
import { EnumFlagDto } from "../dto/card-enum-flag-dto";
import { CreateCardDto } from "../dto/create-cards.dto";
import { RepositoryCardDto } from "../dto/repository-cards.dto";

import { CardsService } from "../services/card.service";

const cardsService = new CardsService();

class CardController {
  async register(request: Request, response: Response) {
    const cardData = request.body as CreateCardDto;
    if ((cardData.flag = EnumFlagDto.credit)) {
      const apiResponse = this.tryRegister(cardData, response);
      return apiResponse;
    }
    if ((cardData.flag = EnumFlagDto.debit)) {
      const apiResponse = this.tryRegister(cardData, response);
      return apiResponse;
    }
    if ((cardData.flag = EnumFlagDto.credit_debit)) {
      const apiResponse = this.tryRegister(cardData, response);
      return apiResponse;
    }
    try {
    } catch (error) {
      return this.handleApiErrorResponse(error, response);
    }
  }

  private async tryRegister(cardData: CreateCardDto, response: Response) {
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
      const cardId = request.body as string;
      const cards = await cardsService.list(cardId);
      return response.status(StatusCode.SUCCESS).json({ cards });
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);

      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }

  private async tryList(request: Request, response: Response) {
    const cardId = request.body as string;
    const cards = await cardsService.list(cardId);
    return response.status(StatusCode.SUCCESS).json({ cards });
  }

  async delete(request: Request, response: Response) {
    try {
      const cardId = request.body as string;
      await cardsService.delete(cardId);
      return response.status(200).json({ message: "Cartão excluido" });
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);

      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }

  private async tryDelete(request: Request, response: Response) {
    const cardId = request.body as string;
    await cardsService.delete(cardId);
    return response.status(200).json({ message: "Cartão excluido" });
  }

  async update(request: Request, response: Response) {
    try {
      const cardData = request.body as RepositoryCardDto;
      await cardsService.update(cardData);
      return response.status(200).json({ message: "Cartão foi atualizado" });
    } catch (error) {
      const apiErrorResponse =
        ExceptionHandler.parseErrorAndGetApiResponse(error);

      return response
        .status(apiErrorResponse.statusCode)
        .json(apiErrorResponse);
    }
  }

  private async tryUpdate(request: Request, response: Response) {
    const cardData = request.body as RepositoryCardDto;
    await cardsService.update(cardData);
    return response.status(200).json({ message: "Cartão foi atualizado" });
  }
  private handleApiErrorResponse(error: unknown, response: Response) {
    const apiResponse = ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiResponse.statusCode).json(apiResponse);
  }
}

export { CardController };
