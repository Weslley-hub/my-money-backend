import { Router } from "express";
import { StatusCode } from "../../api/types/status-code.type";
import { CreateCardDto } from "../dto/create-cards.dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardValidationSchema } from "../validation/cards.schema";

const cardRouter = Router();
const cardRepository = new CardRepository();

cardRouter.post("/register-card", async (req, res) => {
  const cardData = req.body as CreateCardDto;
  cardData.user_id = "6850898b-9939-450b-bb41-a6780b245fb9";
  console.log(cardData);
  /*Eu preciso pegar o id do user que esta logado
  Como fazer isso ?*/
  try {
    await CardValidationSchema.validate(cardData, { abortEarly: false });

    const CreateCard = await cardRepository.registerCard(cardData);
    console.log("CreateCard", CreateCard);
    return res.status(StatusCode.CREATED).json({
      message: "Criado com sucesso",
      statuscode: StatusCode.CREATED,
    });
  } catch (error) {
    return res.json(error);
  }
});

export { cardRouter };
