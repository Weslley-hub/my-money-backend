import * as Yup from "yup";

const UserValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string()
    .email("email deve ser válido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
  avatar: Yup.string().required("Avatar é obrigatório"),
});
const UserValidationLogin = Yup.object().shape({
  email: Yup.string()
    .email("email deve ser válido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});
export { UserValidationSchema };
export { UserValidationLogin };
