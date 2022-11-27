import { MonthKey } from "../enums";

export type RevenueControllerInputDto = {
  year: number;
  month: MonthKey;
  amount: number;
};
