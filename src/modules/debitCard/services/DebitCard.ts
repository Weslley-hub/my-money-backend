import { v4 as uuidv4 } from "uuid";
import { BusinessException } from "../../api/exception";
import { UserRepository } from "../../user/repositories/User";
import { CardType } from "../enums/CardType";
import { DebitCardRepository } from "../repositories/DebitCard";
import { CardDeditValidationSchema } from "../validation/DebitCard";
import { CardDebitValidationUpdate } from "../validation/UpdateDebitCard";
import { FormCardDebitDto } from "../dto";
import { FormCardDebitUserIdDto } from "../dto/FormCardDebitUserId";
import { BodyDebitCard } from "../dto/BodyDebitCard";

const debitCardRepository = new DebitCardRepository();
const userRepository = new UserRepository();
class CardsService {
  private debitCardRepository: DebitCardRepository;
  private userRepository: UserRepository;

  constructor() {
    this.debitCardRepository = new DebitCardRepository();
    this.userRepository = new UserRepository();
  }

  async register(cardData: FormCardDebitUserIdDto) {
    await CardDeditValidationSchema.validate(cardData, {
      abortEarly: false
    });

    await this.verificationExistingCardByNumber(cardData.number);
    await this.verificationExistingUserById(cardData.userId);

    const cardId = uuidv4();
    const cardDataRegister = {
      user_id: cardData.userId,
      id: cardId,
      flag: await this.verificationFlag(cardData.number), //preciso mudar isso
      type: CardType.DEBIT,
      name: cardData.name,
      number: cardData.number
    };
    await this.debitCardRepository.saveDebit(cardDataRegister);
  }

  private async verificationExistingUserById(user_id: string) {
    const id = await this.userRepository.findById(user_id);

    if (!id) {
      throw new BusinessException(`Não existe um usuario com o id: ${user_id}`);
    }
  }

  private async verificationExistingCardByNumber(number: number) {
    const cardNumberDebit = await this.debitCardRepository.findByNumberDebit(
      number
    );

    if (cardNumberDebit) {
      throw new BusinessException(
        `Ja existe um cartão cadastrado com o número: ${number.toString()}`
      );
    }
  }

  async list(userId: string) {
    await this.verificationExistingUserById(userId);
    const listOfDebitCards =
      await this.debitCardRepository.findAllDebitByUserId(userId);

    return listOfDebitCards;
  }
  async uniqueListing(cardId: string) {
    await this.verificationExistingCardById(cardId);
    const debitCard = await this.debitCardRepository.findDebitById(cardId);
    return debitCard;
  }

  async delete(cardId: string) {
    await this.verificationExistingCardById(cardId);

    await this.debitCardRepository.deleteDebit(cardId);
  }

  async update(cardData: FormCardDebitUserIdDto) {
    await CardDebitValidationUpdate.validate(cardData, {
      abortEarly: false
    });
    await this.verificationExistingCardById(cardData.id);
    await this.verificationCardExistingWithNumber(cardData.number, cardData.id);

    const debitCardDataUpdate = {
      id: cardData.id,
      name: cardData.name,
      number: cardData.number,
      flag: await this.verificationFlag(cardData.number),
      type: CardType.DEBIT,
      user_id: cardData.userId
    };

    await this.debitCardRepository.updateDebit(debitCardDataUpdate);
  }

  private async verificationCardTypeValid(cardType: string) {
    if (cardType != CardType.DEBIT) {
      throw new BusinessException(`O tipo ${cardType} é invalido`);
    }
  }

  private async verificationExistingCardById(cardId: string) {
    const existingdebitCard = await this.debitCardRepository.findDebitById(
      cardId
    );

    if (!existingdebitCard) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
  }

  private async verificationCardExistingWithNumber(
    cardNumber: number,
    cardId: string
  ) {
    const debitCard = await this.debitCardRepository.findByNumberDebit(
      cardNumber
    );
    if (debitCard) {
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

  private async verificationCurrentNumberEqualNewNumber(
    cardNumber: number,
    cardId: string
  ) {
    const debitCard = await this.debitCardRepository.findDebitById(cardId);
    if (debitCard?.number == cardNumber) {
      return true;
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
