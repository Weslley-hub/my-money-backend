import { PaymentType } from "../enums";

export type CreateExpenseControllerInput = {
  description: string;
  amount: number;
  isPaid: boolean;
  paymentType: PaymentType;

  revenueId: string;
  debitCardId?: string;
  expenseCategoryId: string;
};
