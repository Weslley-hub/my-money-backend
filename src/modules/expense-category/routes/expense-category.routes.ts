import { Router } from "express";
import { CustomExpenseCategoryController } from "../controllers";

const expenseCategoryRoutes = Router();
const customExpenseCategoryController = new CustomExpenseCategoryController();

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
