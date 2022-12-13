import { dbConnection } from "../../../database";
import { CreateExpenseServiceInput } from "../dto";

const TABLE_NAME = "expenses";

export class ExpenseRepository {
  create(expenseData: CreateExpenseServiceInput) {
    return dbConnection<CreateExpenseServiceInput>(TABLE_NAME).insert(
      expenseData
    );
  }
}
