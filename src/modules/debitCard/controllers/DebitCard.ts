import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/error-handler";
import { StatusCode } from "../../api/types/StatusCode";
import { FormCardDebitDto } from "../dto";
import { CardType } from "../enums/CardType";
import { CardsService } from "../services/DebitCard";

const cardsService = new CardsService();

class CardController {
  async register(request: Request, response: Response) {
    const cardData = request.body as FormCardDebitDto;

    try {
      const apiResponse = await this.tryRegister(cardData, response);
      return apiResponse;
    } catch (error) {
      return await this.cathPattern(error, response);
    }
  }

  private async tryRegister(cardData: FormCardDebitDto, response: Response) {
    await cardsService.register(cardData);
    return response.status(StatusCode.CREATED).json({
      message: "Criado com sucesso",
      statuscode: StatusCode.CREATED
    });
  }

  async list(request: Request, response: Response) {
    const userId = request.query.userId as string;
    try {
      const apiResponse = await this.tryList(userId, response);
      return apiResponse;
    } catch (error) {
      return await this.cathPattern(error, response);
    }
  }

  private async tryList(userId: string, response: Response) {
    const cards = await cardsService.list(userId);
    return response.status(StatusCode.SUCCESS).json({ cards });
  }

  async uniqueListing(request: Request, response: Response) {
    const cardId = request.query.cardId as string;
    try {
      const apiResponse = await this.tryUniqueListing(cardId, response);
      return apiResponse;
    } catch (error) {
      return await this.cathPattern(error, response);
    }
  }
  private async tryUniqueListing(cardId: string, response: Response) {
    const card = await cardsService.uniqueListing(cardId);
    return response.status(StatusCode.SUCCESS).json({ card });
  }

  async delete(request: Request, response: Response) {
    const cardId = request.query.cardId as string;
    try {
      const apiResponse = await this.tryDelete(cardId, response);
      return apiResponse;
    } catch (error) {
      return await this.cathPattern(error, response);
    }
  }

  private async tryDelete(cardId: string, response: Response) {
    await cardsService.delete(cardId);
    return response.status(200).json({ message: "Cartão excluido" });
  }

  async update(request: Request, response: Response) {
    const cardData = request.body as FormCardDebitDto;
    try {
      const apiResponse = await this.tryUpdate(cardData, response);
      return apiResponse;
    } catch (error) {
      return await this.cathPattern(error, response);
    }
  }

  private async tryUpdate(cardData: FormCardDebitDto, response: Response) {
    await cardsService.update({
      id: cardData.id,
      name: cardData.name,
      number: cardData.number,
      flag: cardData.flag,
      userId: cardData.userId
    });
    return response.status(200).json({ message: "Cartão foi atualizado" });
  }

  private async cathPattern(error: unknown, response: Response) {
    const apiErrorResponse =
      ExceptionHandler.parseErrorAndGetApiResponse(error);
    return response.status(apiErrorResponse.statusCode).json(apiErrorResponse);
  }
}

export { CardController };
