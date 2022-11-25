import * as Yup from "yup";

const UserValidationEmail = Yup.object().shape({
  email: Yup.string()
    .email("E-mail deve ser válido")
    .required("E-mail é obrigatório")
});

export { UserValidationEmail };
