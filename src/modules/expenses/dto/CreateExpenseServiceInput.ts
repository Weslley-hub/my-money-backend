import { PaymentType } from "../enums/";
import { CreateExpenseControllerInput } from "./CreateExpenseControllerInput";

export type CreateExpenseServiceInput = CreateExpenseControllerInput & {
  numberOfInstallments: number;
  description: string;
  amount: number;
  isPaid: boolean;
  paymentType: PaymentType;
  revenueId: string;
  debitCardId?: string | undefined;
  creditCardId?: string | undefined;
  expenseCategoryId: string;
  userId: string;
};
