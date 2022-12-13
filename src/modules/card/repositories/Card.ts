import { dbConnection } from "../../../database";
import { RepositoryCardCreditDto } from "../dto/RepositoryCardCredit";
import { RepositoryCardDebitDto } from "../dto/RepositoryCardDebit";

export class CardRepository {
  saveCredit(card: RepositoryCardCreditDto) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards").insert(card);
  }

  saveDebit(card: RepositoryCardDebitDto) {
    return dbConnection<RepositoryCardDebitDto>("debit_cards").insert(card);
  }

  updateCredit(card: RepositoryCardCreditDto) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .update(card)
      .where("id", "=", card.id);
  }

  updateDebit(card: RepositoryCardDebitDto) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .where("id", "=", card.id)
      .update(card);
  }

  deleteDebit(id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .delete()
      .where("id", "=", id);
  }

  deleteCredit(id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .delete()
      .where("id", "=", id);
  }

  findDebitCardByIdAndUserId(id: string, user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("id", "=", id)
      .and.where("user_id", "=", user_id)
      .first();
  }

  findUserByCreditCard(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("user_id", "=", user_id)
      .first();
  }

  findUserByDebitCard(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("user_id", "=", user_id)
      .first();
  }
  findAllCreditByUserId(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("user_id", "=", user_id);
  }
  findAllDebitByUserId(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("user_id", "=", user_id);
  }
  findCreditById(id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("id", "=", id)
      .first();
  }
  findDebitById(id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("id", "=", id)
      .first();
  }

  findByNumberCredit(number: number) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("number", "=", number)
      .first();
  }

  findByNumberDebit(number: number) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("number", "=", number)
      .first();
  }
}
