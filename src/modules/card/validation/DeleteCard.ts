import * as Yup from "yup";

const CardValidationDelete = Yup.object().shape({
  id: Yup.string().required("O id é obrigatorio"),
});

export { CardValidationDelete };
