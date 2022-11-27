import { dbConnection } from "../../../database";
import { RepositoryCardCreditDto } from "../dto/repository-cards-credit.dto";
import { RepositoryCardDebitDto } from "../dto/repository-cards-debit.dto";

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
  deleteCredit(id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .delete()
      .where("id", "=", id);
  }
  deleteDebit(id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .delete()
      .where("id", "=", id);
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
  findCreditByNumber(number: number) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("number", "=", number)
      .first();
  }
  findDebitByNumber(number: number) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("number", "=", number)
      .first();
  }
}
