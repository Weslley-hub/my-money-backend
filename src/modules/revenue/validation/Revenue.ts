import * as Yup from "yup";
import { MonthKeys } from "../enums";

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
  userId: Yup.string().required("Usuário é obrigatório")
});

export { RevenueValidationSchema };
