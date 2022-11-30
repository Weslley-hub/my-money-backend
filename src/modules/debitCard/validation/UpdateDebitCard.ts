import * as Yup from "yup";

const CardDebitValidationUpdate = Yup.object().shape({
  id: Yup.string().required("O id é obrigatorio"),
  name: Yup.string().required("Nome é obrigatorio"),
  userId: Yup.string().required("O user_id é obrigatorio"),
  number: Yup.string().required("O numero é obrigatorio")
});

export { CardDebitValidationUpdate };
