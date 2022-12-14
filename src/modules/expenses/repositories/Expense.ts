import { dbConnection } from "../../../database";
import { UpdateExpenseRepository } from "../dto";

export class ExpenseRepository {
  create(expense: UpdateExpenseRepository) {
    return dbConnection<UpdateExpenseRepository>("expenses").insert(expense);
  }
  findExpenseById(user_id: string) {
    return dbConnection<UpdateExpenseRepository>("expenses")
      .select("*")
      .where("expense_user_id", "=", user_id)
      .first();
  }
  deleteExpenseByUserId(userId: string){
    return dbConnection<UpdateExpenseRepository>("expenses")
      .delete("*")
      .where("user_id", "=", userId);
  }
}
