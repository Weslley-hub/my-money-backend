import * as Yup from "yup";

const CardCreditValidationUpdate = Yup.object().shape({
  id: Yup.string().required("O id é obrigatorio"),
  name: Yup.string().required("Nome é obrigatorio"),
  userId: Yup.string().required("O user_id é obrigatorio"),
  number: Yup.number().required("O numero é obrigatorio"),
  type: Yup.string().required("O tipo é obrigatorio"),
  limit: Yup.number().required("O limite é obrigatorio"),
  invoiceDay: Yup.number().required("O dia da fatura é obrigatório"),
  invoiceAmount: Yup.number().required("O dia da fatura é obrigatório"),
});

export { CardCreditValidationUpdate };
