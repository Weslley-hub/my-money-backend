import * as Yup from "yup";

const UserValidationNewPasswords = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O email é obrigatorio."),
  newPassword: Yup.string().required("A senha é obrigatório."),
  confirmNewPassword: Yup.string().required(
    "A confirmação de senha é obrigatoria."
  )
});

export { UserValidationNewPasswords };
