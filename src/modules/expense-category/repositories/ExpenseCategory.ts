import { dbConnection } from "../../../database";
import { ExpenseCategoryRepositoryDto } from "../dto";

const TABLE_NAME = "expense_categories";

class ExpenseCategoryRepository {
  create(data: ExpenseCategoryRepositoryDto) {
    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME).insert(data);
  }

  findByName(name: string) {
    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME)
      .select()
      .where("name", "=", name)
      .first();
  }

  findByNameAndNotId(name: string, id: string) {
    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME)
      .select()
      .where("name", "=", name)
      .and.where("id", "<>", id);
  }

  update(data: ExpenseCategoryRepositoryDto) {
    const dataToUpdate = {
      icon: data.icon,
      id: data.id,
      name: data.name
    };

    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME)
      .update(dataToUpdate)
      .where("id", "=", data.id);
  }

  findById(id: string) {
    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME)
      .select()
      .where("id", "=", id)
      .first();
  }

  findByUserId(userId: string) {
    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME)
      .select()
      .where("user_id", "=", userId);
  }

  delete(id: string) {
    return dbConnection<ExpenseCategoryRepositoryDto>(TABLE_NAME)
      .delete()
      .where("id", "=", id);
  }
}

export { ExpenseCategoryRepository };
