import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { LessonController } from "./vocabulary.controller";
import {
  lessonValidationSchema,
  updateLessonValidationSchema,
} from "./vocabulary.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.get(
  "/all-lesson",
  auth(USER_ROLE.admin, USER_ROLE.user),
  LessonController.getAllLesson
);

router.get(
  "/single-lesson/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  LessonController.getSingleLesson
);

router.post(
  "/create-lesson",
  auth(USER_ROLE.admin),
  validateRequest(lessonValidationSchema),
  LessonController.createLesson
);

router.patch(
  "/update-lesson/:_id",
  auth(USER_ROLE.admin),
  validateRequest(updateLessonValidationSchema),
  LessonController.updateLesson
);

router.delete(
  "/delete-lesson/:_id",
  auth(USER_ROLE.admin),
  LessonController.deleteLesson
);

export const LessonRoutes = router;
