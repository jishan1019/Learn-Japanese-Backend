import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TutorialController } from "./tutorial.controller";
import {
  tutorialValidationSchema,
  updateTutorialValidationSchema,
} from "./tutorial.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.get(
  "/all-tutorial",
  auth(USER_ROLE.admin, USER_ROLE.user),
  TutorialController.getAllTutorial
);

router.get(
  "/single-tutorial/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  TutorialController.getSingleTutorial
);

router.post(
  "/create-tutorial",
  auth(USER_ROLE.admin),
  validateRequest(tutorialValidationSchema),
  TutorialController.createTutorial
);

router.patch(
  "/update-tutorial/:_id",
  auth(USER_ROLE.admin),
  validateRequest(updateTutorialValidationSchema),
  TutorialController.updateTutorial
);

router.delete(
  "/delete-tutorial/:_id",
  auth(USER_ROLE.admin),
  TutorialController.deleteTutorial
);

export const TutorialRoutes = router;
