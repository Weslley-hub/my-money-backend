import * as Yup from "yup";

const CardValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatorio"),
  id: Yup.string().required("O id é obrigatorio"),
  number: Yup.string().required("O numero é obrigatorio"),
  type: Yup.string().required("O tipo é obrigatorio"),
  flag: Yup.string().required("A bandeira é obrigatoria"),
  limit: Yup.string().required("O limite é obrigatorio"),
});

export { CardValidationSchema };
