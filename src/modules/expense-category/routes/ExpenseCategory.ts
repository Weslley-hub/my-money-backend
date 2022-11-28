import { Router } from "express";
import { ExpenseCategoryController } from "../controllers";

const expenseCategoryRouter = Router();
const customExpenseCategoryController = new ExpenseCategoryController();

expenseCategoryRouter.get(
  "/",
  customExpenseCategoryController.list.bind(customExpenseCategoryController)
);
expenseCategoryRouter.post(
  "/",
  customExpenseCategoryController.create.bind(customExpenseCategoryController)
);
expenseCategoryRouter.put(
  "/:expenseCategoryId",
  customExpenseCategoryController.update.bind(customExpenseCategoryController)
);
expenseCategoryRouter.delete(
  "/:expenseCategoryId",
  customExpenseCategoryController.delete.bind(customExpenseCategoryController)
);

export { expenseCategoryRouter };
