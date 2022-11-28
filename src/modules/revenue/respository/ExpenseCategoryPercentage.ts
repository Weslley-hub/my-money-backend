import { dbConnection } from "../../../database";
import {
  ExpenseCategoryPercentageRepositoryDto,
  ExpenseCategoryPercentageRepositoryOutputDto
} from "../dto";

const TABLE_NAME = "revenue_category_percentages";

export class ExpenseCategoryPercentageRepository {
  create(expenseCategoryPercentage: ExpenseCategoryPercentageRepositoryDto) {
    return dbConnection<ExpenseCategoryPercentageRepositoryDto>(
      TABLE_NAME
    ).insert(expenseCategoryPercentage);
  }

  findByRevenueId(
    revenueId: string
  ): Promise<ExpenseCategoryPercentageRepositoryOutputDto[]> {
    return dbConnection<ExpenseCategoryPercentageRepositoryDto>(TABLE_NAME)
      .select("*")
      .where("revenue_id", "=", revenueId)
      .join(
        "expense_categories",
        "expense_categories.id",
        "=",
        "revenue_category_percentages.expense_category_id"
      );
  }

  removeAllByRevenueId(revenueId: string) {
    return dbConnection<ExpenseCategoryPercentageRepositoryDto>(TABLE_NAME)
      .delete()
      .where("revenue_id", "=", revenueId);
  }
}
