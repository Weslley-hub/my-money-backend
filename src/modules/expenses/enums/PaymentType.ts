export enum PaymentType {
  MONEY = "MONEY",
  DEBIT = "DEBIT",
  DEBIT_CREDIT_CARD = "DEBIT_CREDIT_CARD",
  CREDIT_CARD = "CREDIT_CARD"
}

export const PaymentTypeKeys = [
  "MONEY",
  "DEBIT",
  "DEBIT_CREDIT_CARD",
  "CREDIT_CARD"
];
export const DebitCardKeys = ["DEBIT"];
export const CreditCardKeys = ["CREDIT_CARD", "DEBIT_CREDIT_CARD"];
