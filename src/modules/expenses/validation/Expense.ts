import * as Yup from "yup";
import { PaymentType, PaymentTypeKeys } from "../enums";

export const ExpenseValidationSchema = Yup.object().shape({
  description: Yup.string().required("Descrição é obrigatória"),
  userId: Yup.string().required("O userId é obrigatória"),
  amount: Yup.number().positive().required("Valor é obrigatório"),
  isPaid: Yup.boolean().required("Status de pago ou não é obrigatório"),
  paymentType: Yup.string()
    .oneOf(PaymentTypeKeys, "Tipo de pagamento inválido")
    .required("Tipo de pagamento é obrigatório"),
  revenueId: Yup.string().required("ID da receita é obrigatório"),
  numberOfInstallments: Yup.number().required(
    "O número de parcelas é obrigatório"
  ),
  expenseCategoryId: Yup.string().required(
    "ID da categoria de gastos é obrigatório"
  ),
  debitCardId: Yup.string().when("paymentType", {
    is: shoulValidateDebitCardId,
    then: () => Yup.string().required("ID do cartão de débito é obrigatório")
  }),
  creditCardId: Yup.string().when("paymentType", {
    is: shoulValidateCreditCardId,
    then: () => Yup.string().required("ID do cartão de débito é obrigatório")
  })
});

function shoulValidateCreditCardId(paymentType: string) {
  return (
    paymentType === PaymentType.CREDIT_CARD ||
    paymentType === PaymentType.DEBIT_CREDIT_CARD
  );
}

function shoulValidateDebitCardId(paymentType: string) {
  return paymentType === PaymentType.DEBIT_CARD;
}
