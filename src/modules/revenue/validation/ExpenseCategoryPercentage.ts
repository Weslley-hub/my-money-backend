import * as Yup from "yup";

const expenseCategoryAmountPercentageValidationSchema = Yup.object().shape({
  percentage: Yup.number()
    .positive("Porcentagem não pode ser negativa")
    .required("Porcentagem é obrigatória"),
  categoryId: Yup.string().required("Id da categoria é obrigatória")
});

export { expenseCategoryAmountPercentageValidationSchema };
