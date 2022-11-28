import { Router } from "express";
import { RevenueController } from "../controller";

const revenueRouter = Router();
const revenueController = new RevenueController();

revenueRouter.get(
  "/",
  revenueController.findByMonthAndYear.bind(revenueController)
);
revenueRouter.post("/", revenueController.register.bind(revenueController));
revenueRouter.put(
  "/:revenueId",
  revenueController.update.bind(revenueController)
);
revenueRouter.delete(
  "/:revenueId",
  revenueController.remove.bind(revenueController)
);

export { revenueRouter };
