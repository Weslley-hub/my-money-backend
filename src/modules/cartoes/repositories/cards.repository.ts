import { dbConnection } from "../../../database";
import { RepositoryCardDto } from "../dto/repository-cards.dto";

export class CardRepository {
  save(card: RepositoryCardDto) {
    return dbConnection<RepositoryCardDto>("cards").insert(card);
  }
  update(card: RepositoryCardDto) {
    return dbConnection<RepositoryCardDto>("cards")
      .update(card)
      .where("id", "=", card.id);
  }
  delete(id: string) {
    return dbConnection<RepositoryCardDto>("cards")
      .delete()
      .where("id", "=", id);
  }
  findByUserId(user_id: string) {
    return dbConnection<RepositoryCardDto>("cards")
      .select("*")
      .where("user_id", "=", user_id)
      .first();
  }
  findAllByUserId(user_id: string) {
    return dbConnection<RepositoryCardDto>("cards")
      .select("*")
      .where("user_id", "=", user_id);
  }
  findById(id: string) {
    return dbConnection<RepositoryCardDto>("cards")
      .select("*")
      .where("id", "=", id)
      .first();
  }
}
