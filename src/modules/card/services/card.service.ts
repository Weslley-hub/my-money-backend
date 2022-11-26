import { v4 as uuidv4 } from "uuid";
import { BusinessException } from "../../api/exceptions/business.exception";
import { UserRepository } from "../../user/repositories/user.repository";
import { CreateCardDto } from "../dto/create-cards.dto";
import { RepositoryCardCreditDto } from "../dto/repository-cards-credit.dto";
import { CardType } from "../enums/card-type";
import { CardRepository } from "../repositories/card.repository";
import { CardCreditValidationSchema } from "../validation/card.credit.validation.schema";
import { CardCreditValidationUpdate } from "../validation/card.credit.validation.update";
import { CardDeditValidationSchema } from "../validation/card.debit.validation.schema";
import { CardDebitValidationUpdate } from "../validation/card.debit.validation.update";

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
    const carId = uuidv4();

    await this.verificationNumber(cardData.number);
    await this.verificationId(cardData.user_id);

    if ((cardData.type == CardType.CREDIT || cardData.type == CardType.CREDIT_DEBIT)) {

      await CardCreditValidationSchema.validate(cardData, {
        abortEarly: false,
      });
      await this.cardRepository.saveCredit({
        id: carId,
        name: cardData.name,
        number: cardData.number,
        flag: cardData.flag,
        type: cardData.type,
        limit: cardData.limit,
        invoice_amount: 0,
        invoice_day: cardData.invoice_day,
        user_id: cardData.user_id
      });
    }

    if ((cardData.type == CardType.DEBIT)) {
      await CardDeditValidationSchema.validate(cardData, {
        abortEarly: false,
      });
      await this.cardRepository.saveDebit({
        id: carId,
        name: cardData.name,
        number: cardData.number,
        flag: cardData.flag,
        type: cardData.type,
        user_id: cardData.user_id
      });
    }
  }

  //tirar o nome card pra evitar redundancia
  private async verificationId(user_id: string) {
    const id = await this.userRepository.findById(user_id);

    if (!id) {
      throw new BusinessException(`Não existe um usuario com o id: ${user_id}`);
    }
  }

  private async verificationNumber(number: number) {
    const cardNumberCredit = await this.cardRepository.findByNumberCredit(number);
    const cardNumberDebit = await this.cardRepository.findByNumberDebit(number);

    if (cardNumberCredit || cardNumberDebit) {
      throw new BusinessException(
        `Ja existe um cartão cadastrado com o número: ${number.toString()}`
      );
    }
  }

  async list(userId: string) {
    const listOfCreditCards = await this.cardRepository.findAllCreditByUserId(userId);
    const listOfDebitCards = await this.cardRepository.findAllDebitByUserId(userId);

    var apiResponse = [listOfCreditCards,listOfDebitCards];
    return apiResponse;
  }

  async delete(cardId: string) {
    const cardCredit = await this.verificationExistingCardCreditById(cardId);
    const cardDebit = await this.verificationExistingCardDebitById(cardId);
    if(cardCredit){
      await this.cardRepository.deleteCredit(cardId);
    }
    if(cardDebit){
      await this.cardRepository.deleteDebit(cardId);
    }
  }

  async update(cardData: RepositoryCardCreditDto) {
    if(cardData.type == CardType.CREDIT || cardData.type == CardType.CREDIT_DEBIT){
      await CardCreditValidationUpdate.validate(cardData);
    }
    if(cardData.type == CardType.DEBIT){
      await CardDebitValidationUpdate.validate(cardData);
    }

    await this.verificationExistingCardById(cardData.id);
    await this.verificationCardTypeValid(cardData.type);

    if(cardData.type == CardType.CREDIT || cardData.type == CardType.CREDIT_DEBIT){
        await this.cardRepository.updateCredit(cardData);
    }
    if(cardData.type == CardType.DEBIT){
      await this.cardRepository.updateDebit(cardData);
    }
  }
  private async verificationCardTypeValid(cardType: string){
    if(cardType != CardType.CREDIT && cardType != CardType.CREDIT_DEBIT && cardType != CardType.DEBIT){
      throw new BusinessException(
        `O tipo ${cardType} é invalido`
      );
    }
  }
  private async verificationExistingCardById(cardId: string) {
    const existingCardCredit = await this.cardRepository.findCreditById(cardId);
    const existingCardDebit = await this.cardRepository.findDebitById(cardId);

    if (!existingCardCredit && !existingCardDebit) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
    return existingCardCredit;
  }
  private async verificationExistingCardDebitById(cardId: string) {
    const existingCardDebit = await this.cardRepository.findDebitById(cardId);

    if (!existingCardDebit) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
    return existingCardDebit;
  }
  private async verificationExistingCardCreditById(cardId: string) {
    const existingCardCredit = await this.cardRepository.findDebitById(cardId);

    if (!existingCardCredit) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
    return existingCardCredit;
  }
}

export { CardsService };
