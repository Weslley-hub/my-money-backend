import { dbConnection } from "../../../database";
import { RepositoryCardCreditDto } from "../dto/RepositoryCreditCard";

export class CardRepository {
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
}
