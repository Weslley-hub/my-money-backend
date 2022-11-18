import { v4 as uuidv4 } from "uuid";
import { BusinessException } from "../../api/exceptions/business.exception";
import { CreateCardDto } from "../dto/create-cards.dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardValidationSchema } from "../validation/cards.schema";

const cardRepository = new CardRepository();

class CardsService {
  async registerCard(cardData: CreateCardDto) {
    await CardValidationSchema.validate(cardData, {
      abortEarly: false,
    });
    const carId = uuidv4();
    const card = await cardRepository.findById(cardData.number);
    if (card) {
      throw new BusinessException(
        `Ja existe um cartão cadastrado com o número: ${cardData.number}`
      );
    }
    await cardRepository.save({
      id: carId,
      name: cardData.name,
      number: cardData.number,
      type: cardData.type,
      flag: cardData.flag,
      limit: cardData.limit,
      user_id: cardData.user_id,
    });
  }
}

export { CardsService };
