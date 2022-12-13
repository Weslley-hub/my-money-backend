import { PaymentType } from "../enums";

export type CreateExpenseControllerInput = {
  description: string;
  amount: number;
  isPaid: boolean;
  paymentType: PaymentType;
  numberOfInstallments: number;
  revenueId: string;
  debitCardId?: string;
  expenseCategoryId: string;
};
