import { ExpenseCategoryRepositoryDto } from "../../expense-category/dto";

export type ExpenseCategoryPercentageRepositoryOutputDto =
  ExpenseCategoryRepositoryDto & {
    percentage: number;
  };
