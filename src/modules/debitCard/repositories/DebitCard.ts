import { dbConnection } from "../../../database";
import { RepositoryCardDebitDto } from "../dto/RepositoryCardDebit";

export class CardRepository {
  saveDebit(card: RepositoryCardDebitDto) {
    return dbConnection<RepositoryCardDebitDto>("debit_cards").insert(card);
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

  findAllDebitByUserId(user_id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("user_id", "=", user_id);
  }

  findDebitById(id: string) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("id", "=", id)
      .first();
  }

  findByNumberDebit(number: number) {
    return dbConnection<RepositoryCardCreditDto>("debit_cards")
      .select("*")
      .where("number", "=", number)
      .first();
  }
}
