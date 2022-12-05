import { dbConnection } from "../../../database";
import { UpdateExpenseRepository } from "../dto";

export class ExpenseRepository {
  create(expense: UpdateExpenseRepository) {
    return dbConnection<UpdateExpenseRepository>("expenses").insert(expense);
  }
}
