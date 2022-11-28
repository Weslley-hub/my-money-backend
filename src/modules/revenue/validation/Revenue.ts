import * as Yup from "yup";
import { MonthKeys } from "../enums";
import { expenseCategoryAmountPercentageValidationSchema } from "./ExpenseCategoryPercentage";

const RevenueValidationSchema = Yup.object().shape({
  year: Yup.number()
    .positive("Ano não pode ser negativo")
    .required("Ano é obrigatório"),
  month: Yup.string()
    .oneOf(MonthKeys, "Mês inválido")
    .required("Mês é obrigatório"),
  amount: Yup.number()
    .positive("Valor da receita não pode ser negativo")
    .required("Valor da receita é obrigatório"),
  expenseCategoryPercentages: Yup.array()
    .of(expenseCategoryAmountPercentageValidationSchema)
    .required("Porcentagens por categorias são obrigatórias")
    .min(1, "Pelo menos uma categoria deve ser adicionada à receita"),
  userId: Yup.string().required("Id do usuário é obrigatório")
});

export { RevenueValidationSchema };
