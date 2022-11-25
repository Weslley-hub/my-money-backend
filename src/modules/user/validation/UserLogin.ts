import * as Yup from "yup";

const UserValidationLogin = Yup.object().shape({
  email: Yup.string()
    .email("email deve ser válido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória")
});

export { UserValidationLogin };
