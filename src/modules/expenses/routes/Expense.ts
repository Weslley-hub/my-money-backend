import { Router } from "express";
import { ExpenseController } from "../controller/Expense";

const expenseRouter = Router();
const expenseController = new ExpenseController();

expenseRouter.post("/", expenseController.create.bind(expenseController));

export { expenseRouter };
