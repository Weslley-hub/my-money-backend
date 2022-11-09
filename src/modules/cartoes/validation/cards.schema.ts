import * as Yup from "yup";

const CardValidationSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatorio"),
  id: Yup.string().required("O id é obrigatorio"),
  numero: Yup.string().required("O numero é obrigatorio"),
  tipo: Yup.string().required("O tipo é obrigatorio"),
  bandeira: Yup.string().required("A bandeira é obrigatoria"),
  limite: Yup.string().required("O limite é obrigatorio"),
});

export { CardValidationSchema };
