import { v4 as uuidv4 } from "uuid";
import { BusinessException } from "../../api/exception";
import { UserRepository } from "../../user/repositories/User";
import { CreateCardDto } from "../dto/CreateCard";
import { FormCardCreditDto } from "../dto/FormCardCredit";
import { CardType } from "../enums/CardType";

import { CardRepository } from "../repositories/Card";
import { CardCreditValidationSchema } from "../validation/CardCredit";
import { CardCreditValidationUpdate } from "../validation/UpdateCardCredit";
import { CardDeditValidationSchema } from "../validation/CardDebit";
import { CardDebitValidationUpdate } from "../validation/UpdateCardDebit";

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

    await this.verificationExistingCardByNumber(cardData.number);
    await this.verificationExistingUserById(cardData.user_id);
    await this.verificationCardTypeValid(cardData.type);

    await this.verificationCardTypeValid(cardData.type);

    if (
      cardData.type == CardType.CREDIT ||
      cardData.type == CardType.CREDIT_DEBIT
    ) {
      await CardCreditValidationSchema.validate(cardData, {
        abortEarly: false
      });
      await this.cardRepository.saveCredit({
        id: carId,
        name: cardData.name,
        number: cardData.number,
        flag: await this.verificationFlag(cardData.number),
        type: cardData.type,
        limit: cardData.limit,
        invoice_amount: 0,
        invoice_day: cardData.invoice_day,
        user_id: cardData.user_id
      });
    }

    if (cardData.type == CardType.DEBIT) {
      await CardDeditValidationSchema.validate(cardData, {
        abortEarly: false
      });

      await this.cardRepository.saveDebit({
        id: carId,
        name: cardData.name,
        number: cardData.number,
        flag: await this.verificationFlag(cardData.number),
        type: cardData.type,
        user_id: cardData.user_id
      });
    }
  }

  private async verificationExistingUserById(user_id: string) {
    const id = await this.userRepository.findById(user_id);

    if (!id) {
      throw new BusinessException(`Não existe um usuario com o id: ${user_id}`);
    }
  }

  private async verificationExistingCardByNumber(number: number) {
    const creditCardByNumber = await this.cardRepository.findByNumberCredit(
      number
    );

    if (creditCardByNumber) {
      throw new BusinessException(
        `Ja existe um cartão cadastrado com o número: ${number.toString()}`
      );
    }
  }

  async list(userId: string) {
    const listOfCreditCards = await this.cardRepository.findAllCreditByUserId(
      userId
    );
    const listOfDebitCards = await this.cardRepository.findAllDebitByUserId(
      userId
    );

    var apiResponse = [listOfCreditCards, listOfDebitCards];
    return apiResponse;
  }
  async uniqueListing(userId: string) {
    const cardCredit = await this.cardRepository.findCreditById(userId);
    const cardDebit = await this.cardRepository.findDebitById(userId);

    var apiResponse = [cardCredit, cardDebit];
    return apiResponse;
  }

  async delete(cardId: string) {
    await this.verificationExistingCreditCardById(cardId);
    await this.cardRepository.deleteCredit(cardId);
  }

  async update(cardData: FormCardCreditDto) {
    await this.verificationCardTypeValid(cardData.type);
    await this.verificationExistingCreditCardById(cardData.id);
    await this.verificationExistingCardWithNumber(cardData.number, cardData.id);

    if (
      cardData.type == CardType.CREDIT ||
      cardData.type == CardType.CREDIT_DEBIT
    ) {
      await CardCreditValidationUpdate.validate(cardData);

      const creditCardDataUpdate = {
        id: cardData.id,
        name: cardData.name,
        number: cardData.number,
        flag: await this.verificationFlag(cardData.number),
        type: cardData.type,
        limit: cardData.limit,
        invoice_amount: cardData.invoiceAmount,
        invoice_day: cardData.invoiceDay,
        user_id: cardData.userId
      };
      const existingCreditCard =
        await this.verificationCardCreditExistingByIdUpdate(cardData.id);

      if (existingCreditCard) {
        await this.cardRepository.updateCredit(creditCardDataUpdate);
      } else {
        await this.cardRepository.saveCredit(creditCardDataUpdate);
        await this.cardRepository.deleteDebit(creditCardDataUpdate.id);
      }
    }
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
    if (cardType != CardType.CREDIT && cardType != CardType.CREDIT_DEBIT) {
      throw new BusinessException(`O tipo ${cardType} é invalido`);
    }
  }

  private async verificationExistingCreditCardById(cardId: string) {
    const existingCreditCard = await this.cardRepository.findCreditById(cardId);

    if (!existingCreditCard) {
      throw new BusinessException(
        `Não existe um cartão com esse id: ${cardId}`
      );
    }
    return existingCreditCard;
  }

  private async verificationExistingCardDebitByIdUpdate(cardId: string) {
    const existingCardDebit = await this.cardRepository.findDebitById(cardId);
    return existingCardDebit;
  }

  private async verificationCardCreditExistingByIdUpdate(cardId: string) {
    const existingCardCredit = await this.cardRepository.findCreditById(cardId);
    return existingCardCredit;
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

  private async verificationExistingCardWithNumber(
    cardNumber: number,
    cardId: string
  ) {
    const cardCredit = await this.cardRepository.findByNumberCredit(cardNumber);
    if (cardCredit) {
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
