import { PaymentType } from "../enums/";

export type UpdateExpenseRepository = {
  number_of_installments: number;
  description: string;
  amount: number;
  paid: boolean;
  payment_type: PaymentType;
  revenue_id: string;
  debit_card_id?: string | undefined;
  credit_card_id?: string | undefined;
  expense_category_id: string;
  expense_user_id: string;
  id: string;
  date: Date;
};
