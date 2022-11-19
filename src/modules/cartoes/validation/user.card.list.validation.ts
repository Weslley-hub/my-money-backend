import * as Yup from "yup";

const UserCardListValidation = Yup.object().shape({
  id: Yup.string().required("O id é obrigatorio"),
});

export { UserCardListValidation };
