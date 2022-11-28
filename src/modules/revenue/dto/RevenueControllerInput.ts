import { MonthKey } from "../enums";
import { ExpenseCategoryPercentageServiceInputDto } from "./ExpenseCategoryPercentageServiceInput";

export type RevenueControllerInputDto = {
  year: number;
  month: MonthKey;
  amount: number;

  expenseCategoryPercentages: ExpenseCategoryPercentageServiceInputDto[];
};
