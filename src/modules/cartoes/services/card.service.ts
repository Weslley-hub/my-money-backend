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
  private cardRepository: CardRepository;
  private userRepository: UserRepository;

  constructor() {
    this.cardRepository = new CardRepository();
    this.userRepository = new UserRepository();
  }

  async register(cardData: CreateCardDto) {
    await CardValidationSchema.validate(cardData, {
      abortEarly: false,
    });
    const carId = uuidv4();

    this.verificationNumber(cardData.number);
    this.verificationId(cardData.user_id);

    await cardRepository.save({
      id: carId,
      name: cardData.name,
      number: cardData.number,
      flag: cardData.flag,
      type: cardData.type,
      limit: cardData.limit,
      invoice_amount: 0,
      invoice_day: cardData.invoice_day,
      user_id: cardData.user_id,
    });
  }

  //tirar o nome card pra evitar redundancia
  private async verificationId(user_id: string) {
    const id = await userRepository.findById(user_id);
    if (!id) {
      throw new BusinessException(`Não existe um usuario com o id: ${user_id}`);
    }
  }

  //tirar o nome card pra evitar redundancia
  private async verificationNumber(number: number) {
    const cardNumber = await cardRepository.findByNumber(number);
    if (cardNumber) {
      throw new BusinessException(
        `Ja existe um cartão cadastrado com o número: ${number}`
      );
    }
  }

  async list(cardId: string) {
    return await cardRepository.findAllByUserId(cardId);
  }

  async delete(cardId: string) {
    await this.verificationExistingCardById(cardId);

    await cardRepository.delete(cardId);
  }

  async update(cardData: RepositoryCardDto) {
    await CardValidationUpdate.validate(cardData);
    await this.verificationExistingCardById(cardData.id);

    await cardRepository.update(cardData);
  }

  private async verificationExistingCardById(cardId: string) {
    const existingCardById = await cardRepository.findById(cardId);

    if (!existingCardById) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
  }
}

export { CardsService };
