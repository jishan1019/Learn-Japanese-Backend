import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TutorialController } from "./tutorial.controller";
import { tutorialValidationSchema } from "./tutorial.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post(
  "/create-tutorial",
  auth(USER_ROLE.admin),
  validateRequest(tutorialValidationSchema),
  TutorialController.createTutorial
);

export const TutorialRoutes = router;
