import { dbConnection } from "../../../database";
import { RevenueRepositoryDto, UpdateRevenueRepositoryInputDto } from "../dto";
import {
  FindByMonthAndYearAndNotIdRepository,
  FindByMonthAndYearAndUserIdRepository
} from "../types";

const TABLE_NAME = "revenues";

export class RevenueRepository {
  findByMonthAndYear(month: number, year: number, userId: string) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .select()
      .where("month", "=", month)
      .and.where("year", "=", year)
      .and.where("user_id", "=", userId)
      .first();
  }

  findByMonthAndYearAndNotId(params: FindByMonthAndYearAndNotIdRepository) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .select()
      .where("month", "=", params.month)
      .and.where("year", "=", params.year)
      .and.where("id", "<>", params.id)
      .first();
  }

  findById(id: string) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .select()
      .where("id", "=", id)
      .first();
  }

  findAllByUserId(userId: string) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .select("*")
      .where("user_id", "=", userId);
  }

  findByUserIdAndMonthAndYear(params: FindByMonthAndYearAndUserIdRepository) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .select("*")
      .where("user_id", "=", params.userId)
      .and.where("month", "=", params.month)
      .and.where("year", "=", params.year)
      .first();
  }

  create(data: RevenueRepositoryDto) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME).insert(data);
  }

  update(data: UpdateRevenueRepositoryInputDto) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .update({
        amount: data.amount,
        month: data.month,
        year: data.year
      })
      .where("id", "=", data.id);
  }

  delete(id: string) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .delete()
      .where("id", "=", id);
  }
  deleteRevenueByUserId(userId: string) {
    return dbConnection<RevenueRepositoryDto>(TABLE_NAME)
      .delete("*")
      .where("user_id", "=", userId);
  }
}
