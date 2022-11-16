import { dbConnection } from "../../../database";
import { CreateCardDto } from "../dto/create-cards.dto";

export class CardRepository {
  save(card: CreateCardDto) {
    return dbConnection<CreateCardDto>("cards").insert(card);
  }
  update(card: CreateCardDto) {
    return dbConnection<CreateCardDto>("cards")
      .update(card)
      .where("id", "=", card.id);
  }
  delete(id: string) {
    return dbConnection<CreateCardDto>("cards").delete().where("id", "=", id);
  }
  findByUserId(user_id: string) {
    return dbConnection<CreateCardDto>("cards")
      .select("*")
      .where("user_id", "=", user_id)
      .first();
  }
  findAllByUserId(user_id: string) {
    return dbConnection<CreateCardDto>("cards")
      .select("*")
      .where("user_id", "=", user_id);
  }
}
