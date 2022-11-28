import { v4 as uuidv4 } from "uuid";
import { BusinessException } from "../../api/exception";
import { UserRepository } from "../../user/repositories/User";
import { CardType } from "../enums/CardType";
import { CardRepository } from "../repositories/DebitCard";
import { CardDeditValidationSchema } from "../validation/CardDebit";
import { CardDebitValidationUpdate } from "../validation/UpdateCardDebit";
import { FormCardDebitDto } from "../dto";

const cardRepository = new CardRepository();
const userRepository = new UserRepository();
class CardsService {
  private cardRepository: CardRepository;
  private userRepository: UserRepository;

  constructor() {
    this.cardRepository = new CardRepository();
    this.userRepository = new UserRepository();
  }

  async register(cardData: FormCardDebitDto) {
    const carId = uuidv4();

    await this.verificationExistingCardByNumber(cardData.number);
    await this.verificationExistingUserById(cardData.userId);
    await this.verificationCardTypeValid(cardData.type);

    await CardDeditValidationSchema.validate(cardData, {
      abortEarly: false
    });

    await this.cardRepository.saveDebit({
      id: carId,
      name: cardData.name,
      number: cardData.number,
      flag: await this.verificationFlag(cardData.number),
      type: cardData.type,
      user_id: cardData.userId
    });
  }

  private async verificationExistingUserById(user_id: string) {
    const id = await this.userRepository.findById(user_id);

    if (!id) {
      throw new BusinessException(`Não existe um usuario com o id: ${user_id}`);
    }
  }

  private async verificationExistingCardByNumber(number: number) {
    const cardNumberDebit = await this.cardRepository.findByNumberDebit(number);

    if (cardNumberDebit) {
      throw new BusinessException(
        `Ja existe um cartão cadastrado com o número: ${number.toString()}`
      );
    }
  }

  async list(userId: string) {
    const listOfDebitCards = await this.cardRepository.findAllDebitByUserId(
      userId
    );

    return listOfDebitCards;
  }
  async uniqueListing(userId: string) {
    const cardDebit = await this.cardRepository.findDebitById(userId);

    return cardDebit;
  }

  async delete(cardId: string) {
    await this.verificationExistingCardById(cardId);

    await this.cardRepository.deleteDebit(cardId);
  }

  async update(cardData: FormCardDebitDto) {
    await this.verificationCardTypeValid(cardData.type);
    await this.verificationExistingCardById(cardData.id);
    await this.verificationCardExistingWithNumber(cardData.number, cardData.id);

    if (cardData.type == CardType.DEBIT) {
      await CardDebitValidationUpdate.validate(cardData);

      const debitCardDataUpdate = {
        id: cardData.id,
        name: cardData.name,
        number: cardData.number,
        flag: await this.verificationFlag(cardData.number),
        type: cardData.type,
        user_id: cardData.userId
      };
      const existingDebitCard =
        await this.verificationExistingCardDebitByIdUpdate(cardData.id);

      if (existingDebitCard) {
        await this.cardRepository.updateDebit(debitCardDataUpdate);
      } else {
        await this.cardRepository.saveDebit(debitCardDataUpdate);
        await this.cardRepository.deleteCredit(debitCardDataUpdate.id);
      }
    }
  }

  private async verificationCardTypeValid(cardType: string) {
    if (cardType != CardType.DEBIT) {
      throw new BusinessException(`O tipo ${cardType} é invalido`);
    }
  }

  private async verificationExistingCardById(cardId: string) {
    const existingCardDebit = await this.cardRepository.findDebitById(cardId);

    if (!existingCardDebit) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
  }

  private async verificationExistingCardDebitByIdUpdate(cardId: string) {
    const existingCardDebit = await this.cardRepository.findDebitById(cardId);
    return existingCardDebit;
  }

  private async verificationCurrentNumberEqualNewNumber(
    cardNumber: number,
    cardId: string
  ) {
    const cardCredit = await this.cardRepository.findCreditById(cardId);
    const cardDebit = await this.cardRepository.findDebitById(cardId);
    if (cardCredit?.number == cardNumber || cardDebit?.number == cardNumber) {
      return true;
    }
  }

  private async verificationCardExistingWithNumber(
    cardNumber: number,
    cardId: string
  ) {
    const cardCredit = await this.cardRepository.findByNumberCredit(cardNumber);
    const cardDebit = await this.cardRepository.findByNumberDebit(cardNumber);
    if (cardCredit || cardDebit) {
      if (
        await this.verificationCurrentNumberEqualNewNumber(cardNumber, cardId)
      ) {
        return;
      }
      throw new BusinessException(
        `Já existe um cartão registrado com esse número`
      );
    }
  }

  private async verificationFlag(cardNumber: Number) {
    const cardNumberString = cardNumber.toString();

    var regexVisa = /^4[0-9]{12}(?:[0-9]{3})?/;
    var regexMaster = /^5[1-5][0-9]{14}/;
    var regexAmex = /^3[47][0-9]{13}/;
    var regexDiners = /^3(?:0[0-5]|[68][0-9])[0-9]{11}/;
    var regexDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}/;
    var regexJCB = /^(?:2131|1800|35\d{3})\d{11}/;

    if (regexVisa.test(cardNumberString)) {
      return "VISA";
    }
    if (regexMaster.test(cardNumberString)) {
      return "MasterCard";
    }
    if (regexAmex.test(cardNumberString)) {
      return "American Express";
    }
    if (regexDiners.test(cardNumberString)) {
      return "Diners Club";
    }
    if (regexDiscover.test(cardNumberString)) {
      return "Discover";
    }
    if (regexJCB.test(cardNumberString)) {
      return "JCB";
    }

    return "";
  }
}

export { CardsService };
