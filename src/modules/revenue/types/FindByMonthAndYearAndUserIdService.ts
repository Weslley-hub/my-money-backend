import { MonthKey } from "../enums";

export type FindByMonthAndYearAndUserIdService = {
  userId: string;
  month: MonthKey;
  year: number;
};
