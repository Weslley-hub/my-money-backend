import * as Yup from "yup";

const CardValidationUpdate = Yup.object().shape({
  id: Yup.string().required("O id é obrigatorio"),
  user_id: Yup.string().required("O user_id é obrigatorio"),
  name: Yup.string().required("Nome é obrigatorio"),
  number: Yup.string().required("O numero é obrigatorio"),
  type: Yup.string().required("O tipo é obrigatorio"),
  flag: Yup.string().required("A bandeira é obrigatoria"),
  limit: Yup.string().required("O limite é obrigatorio"),
});

export { CardValidationUpdate };
