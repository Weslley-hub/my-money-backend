import * as Yup from "yup";

const UserValidationNewPasswords = Yup.object().shape({
  newPassword: Yup.string().required("A senha é obrigatório"),
  confirmNewPassword: Yup.string().required(
    "A confirmação de senha é obrigatoria"
  ),
});

export { UserValidationNewPasswords };
