import * as Yup from "yup";

const CardDebitValidationUpdate = Yup.object().shape({
  id: Yup.string().required("O id é obrigatorio"),
  name: Yup.string().required("Nome é obrigatorio"),
  user_id: Yup.string().required("O user_id é obrigatorio"),
  number: Yup.string().required("O numero é obrigatorio"),
  type: Yup.string().required("O tipo é obrigatorio"),
  flag: Yup.string().required("A bandeira é obrigatoria"),
  limit: Yup.string().required("O limite é obrigatorio"),
  invoice_day: Yup.string().required("O dia da fatura é obrigatório"),
  invoice_amout: Yup.string().required("O dia da fatura é obrigatório"),
});

export { CardDebitValidationUpdate };
