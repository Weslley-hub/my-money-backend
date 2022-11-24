import { dbConnection } from "../../../database";
import { CustomExpenseCategoryRepositoryDto } from "../dto";

class CustomExpenseCategoryRepository {
  create(data: CustomExpenseCategoryRepositoryDto) {
    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    ).insert(data);
  }

  findByName(name: string) {
    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    )
      .select()
      .where("name", "=", name)
      .first();
  }

  findByNameAndNotId(name: string, id: string) {
    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    )
      .select()
      .where("name", "=", name)
      .and.where("id", "<>", id);
  }

  update(data: CustomExpenseCategoryRepositoryDto) {
    const dataToUpdate = {
      icon: data.icon,
      id: data.id,
      name: data.name
    };

    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    )
      .update(dataToUpdate)
      .where("id", "=", data.id);
  }

  findById(id: string) {
    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    )
      .select()
      .where("id", "=", id)
      .first();
  }

  findByUserId(userId: string) {
    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    )
      .select()
      .where("user_id", "=", userId);
  }

  delete(id: string) {
    return dbConnection<CustomExpenseCategoryRepositoryDto>(
      "custom_expense_categories"
    )
      .delete()
      .where("id", "=", id);
  }
}

export { CustomExpenseCategoryRepository };
