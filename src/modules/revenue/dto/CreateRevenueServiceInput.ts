import { MonthKey } from "../enums";
import { ExpenseCategoryPercentageServiceInputDto } from "./ExpenseCategoryPercentageServiceInput";

export type CreateRevenueServiceInputDto = {
  year: number;
  month: MonthKey;
  amount: number;
  userId: string;

  expenseCategoryPercentages: ExpenseCategoryPercentageServiceInputDto[];
};
