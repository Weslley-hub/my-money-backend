import { MonthKey } from "../enums";

export type UpdateRevenueServiceInputDto = {
  id: string;
  year: number;
  month: MonthKey;
  amount: number;
  userId: string;
};
