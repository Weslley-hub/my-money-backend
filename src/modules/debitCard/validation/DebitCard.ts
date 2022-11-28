import * as Yup from "yup";

const CardDeditValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  user_id: Yup.string().required("O Cartão precisa de um user_id"),
  number: Yup.string().required("O numero é obrigatório"),
  type: Yup.string().required("O tipo é obrigatório")
});

export { CardDeditValidationSchema };
