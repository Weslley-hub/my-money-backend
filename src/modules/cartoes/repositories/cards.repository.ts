import { dbConnection } from "../../../database";
import { CreateCardDto } from "../dto/create-cards.dto";

export class CardRepository {
  registerCard(card: CreateCardDto) {
    return dbConnection<CreateCardDto>("cards").insert(card);
  }
}
