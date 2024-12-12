import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.get(
  "/all-dashboard-info",
  auth(USER_ROLE.admin),
  DashboardController.getAllDashboardInfo
);

export const DashboardRoutes = router;
