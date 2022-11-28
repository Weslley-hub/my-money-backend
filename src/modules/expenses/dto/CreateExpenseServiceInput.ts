import { CreateExpenseControllerInput } from "./CreateExpenseControllerInput";

export type CreateExpenseServiceInput = CreateExpenseControllerInput & {
  userId: string;
};
