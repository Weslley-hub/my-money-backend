import { Router } from "express";
import { ExpenseCategoryController } from "../controllers";

const expenseCategoryRoutes = Router();
const customExpenseCategoryController = new ExpenseCategoryController();

expenseCategoryRoutes.get(
  "/",
  customExpenseCategoryController.list.bind(customExpenseCategoryController)
);
expenseCategoryRoutes.post(
  "/",
  customExpenseCategoryController.create.bind(customExpenseCategoryController)
);
expenseCategoryRoutes.put(
  "/:expenseCategoryId",
  customExpenseCategoryController.update.bind(customExpenseCategoryController)
);
expenseCategoryRoutes.delete(
  "/:expenseCategoryId",
  customExpenseCategoryController.delete.bind(customExpenseCategoryController)
);

export { expenseCategoryRoutes };
