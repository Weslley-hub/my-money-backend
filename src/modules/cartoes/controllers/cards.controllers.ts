import { Request, Response } from "express";
import { ExceptionHandler } from "../../api/exception-handler/exception.handler";
import { BusinessException } from "../../api/exceptions/business.exception";
import { StatusCode } from "../../api/types/status-code.type";
import { CreateCardDto } from "../dto/create-cards.dto";
import { CardsService } from "../services/cards.service";
import { CardValidationSchema } from "../validation/cards.schema";

const cardsService = new CardsService();

class CardController {
  async registerCard(request: Request, response: Response) {
    const cardData = request.body as CreateCardDto;
    console.log(cardData);
    /*Eu preciso pegar o id do user que esta logado
  Como fazer isso ?*/
    try {
      await cardsService.registerCard(cardData);
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
}

export { CardController };
