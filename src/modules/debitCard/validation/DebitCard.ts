import * as Yup from "yup";

const CardDeditValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  number: Yup.string().required("O numero é obrigatório")
});

export { CardDeditValidationSchema };
