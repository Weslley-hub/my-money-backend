import { CreateCardDto } from "../dto/create-cards.dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardValidationSchema } from "../validation/cards.schema";

const cardRepository = new CardRepository();

class CardsService {
  async registerCard(cardData: CreateCardDto) {
    await CardValidationSchema.validate(cardData, {
      abortEarly: false,
    });
    await cardRepository.registerCard(cardData);
  }
}

export { CardsService };
