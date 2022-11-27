import { MonthKey } from "../enums";

export type RevenueServiceOutputDto = {
  id: string;
  year: number;
  month: MonthKey;
  amount: number;
  usedAmount: number;
};
