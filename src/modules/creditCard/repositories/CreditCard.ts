import { dbConnection } from "../../../database";
import { RepositoryCardCreditDto } from "../dto/RepositoryCreditCard";

export class CreditCardRepository {
  saveCredit(card: RepositoryCardCreditDto) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards").insert(card);
  }

  updateCredit(card: RepositoryCardCreditDto) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .update(card)
      .where("id", "=", card.id);
  }

  deleteCredit(id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .delete()
      .where("id", "=", id);
  }

  findByUserId(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("user_id", "=", user_id)
      .first();
  }
  findAllCreditByUserId(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("user_id", "=", user_id);
  }

  findCreditById(id: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
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

  findCreditCardByIdAndUserId(id: string, userId: string) {
    return dbConnection<RepositoryCardCreditDto>("credit_cards")
      .select("*")
      .where("id", "=", id)
      .and.where("user_id", "=", userId)
      .first();
  }

  findUserByDebitCard(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("user_id", "=", user_id)
      .first();
  }

  findDebitCardByIdAndUserId(id: string, userId: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("id", "=", id)
      .and.where("user_id", "=", userId)
      .first();
  }

  deleteCreditByUserId(userId: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .delete("*")
      .where("user_id", "=", userId);
  }
}
