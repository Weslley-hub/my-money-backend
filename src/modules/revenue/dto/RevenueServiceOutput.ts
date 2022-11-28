import { MonthKey } from "../enums";
import { ExpenseCategoryPercentageServiceOutputDto } from "./ExpenseCategoryPercentageServiceOutput";

export type RevenueServiceOutputDto = {
  id: string;
  year: number;
  month: MonthKey;
  amount: number;
  usedAmount: number;

  categoryPercentages: ExpenseCategoryPercentageServiceOutputDto[];
};
