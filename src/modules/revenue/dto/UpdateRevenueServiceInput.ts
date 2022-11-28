import { MonthKey } from "../enums";
import { ExpenseCategoryPercentageServiceInputDto } from "./ExpenseCategoryPercentageServiceInput";

export type UpdateRevenueServiceInputDto = {
  id: string;
  year: number;
  month: MonthKey;
  amount: number;
  userId: string;

  expenseCategoryPercentages: ExpenseCategoryPercentageServiceInputDto[];
};
