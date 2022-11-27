import { MonthKey } from "../enums";

export type CreateRevenueServiceInputDto = {
  year: number;
  month: MonthKey;
  amount: number;
  userId: string;
};
