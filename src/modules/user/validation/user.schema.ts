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
const UserValidationEmail = Yup.object().shape({
  email: Yup.string()
    .email("E-mail deve ser válido")
    .required("E-mail é obrigatório"),
});

const UserValidationNewPasswords = Yup.object().shape({
  newPassword: Yup.string().required("A senha é obrigatório"),
  confirmNewPassword: Yup.string().required(
    "A confirmação de senha é obrigatoria"
  ),
});
export {
  UserValidationSchema,
  UserValidationLogin,
  UserValidationEmail,
  UserValidationNewPasswords,
};
