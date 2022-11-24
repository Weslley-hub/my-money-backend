import * as Yup from "yup";

const CustomExpenseCategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  icon: Yup.string().required("Ícone é obrigatório"),
  userId: Yup.string().required("Usuário é obrigatório")
});

export { CustomExpenseCategoryValidationSchema };
