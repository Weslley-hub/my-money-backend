import * as Yup from "yup";
import { PaymentType, PaymentTypeKeys } from "../enums";

export const ExpenseValidationSchema = Yup.object().shape({
  description: Yup.string().required("Descrição é obrigatória"),
  amount: Yup.number().positive().required("Valor é obrigatório"),
  isPaid: Yup.boolean().required("Status de pago ou não é obrigatório"),
  paymentType: Yup.string()
    .oneOf(PaymentTypeKeys, "Tipo de pagamento inválido")
    .required("Tipo de pagamento é obrigatório"),
  revenueId: Yup.string().required("ID da receita é obrigatório"),
  expenseCategoryId: Yup.string().required(
    "ID da categoria de gastos é obrigatório"
  ),
  debitCardId: Yup.string().when("paymentType", {
    is: shoulValidateDebitCardId,
    then: () => Yup.string().required("ID do cartão de débito é obrigatório")
  })
});

function shoulValidateDebitCardId(paymentType: string) {
  return (
    paymentType === PaymentType.DEBIT ||
    paymentType === PaymentType.DEBIT_CREDIT_CARD
  );
}
