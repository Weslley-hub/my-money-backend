import { v4 as uuidv4 } from "uuid";
import { BusinessException } from "../../api/exceptions/business.exception";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateCardDto } from "../dto/create-cards.dto";
import { DeleteCardDto } from "../dto/delete-cards.dto";
import { RepositoryCardDto } from "../dto/repository-cards.dto";
import { UserCardList } from "../dto/user-card-list-dto";
import { CardRepository } from "../repositories/cards.repository";
import { CardValidationDelete } from "../validation/card.validation.delete";
import { CardValidationUpdate } from "../validation/card.validation.update";
import { CardValidationSchema } from "../validation/cards.validation.schema";
import { UserCardListValidation } from "../validation/user.card.list.validation";

const cardRepository = new CardRepository();
const userRepository = new UserRepository();
class CardsService {
  async register(cardData: CreateCardDto) {
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
    const userId = await userRepository.findById(cardData.user_id);
    if (!userId) {
      throw new BusinessException(
        `Não existe um usuario com o id: ${cardData.user_id}`
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

  async userCardList(cardData: UserCardList) {
    await UserCardListValidation.validate(cardData);
    const cardRepository = new CardRepository();
    return await cardRepository.findAllByUserId(cardData.id);
  }

  async delete(cardData: DeleteCardDto) {
    await CardValidationDelete.validate(cardData);
    const cardRepository = new CardRepository();
    const existingCardById = await cardRepository.findById(cardData.id);

    if (!existingCardById) {
      throw new BusinessException(
        `Não existe um cartão com o id.: ${cardData.id}`
      );
    }

    await cardRepository.delete(cardData.id);
  }
  async update(cardData: RepositoryCardDto) {
    await CardValidationUpdate.validate(cardData);

    const cardRepository = new CardRepository();
    const existingCardById = await cardRepository.findById(cardData.id);

    if (!existingCardById) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardData.id}`
      );
    }

    await cardRepository.update(cardData);
  }
  async() {}
}

export { CardsService };
