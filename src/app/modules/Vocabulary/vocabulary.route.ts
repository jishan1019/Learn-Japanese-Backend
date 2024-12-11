import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { VocabularyController } from "./vocabulary.controller";

import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import {
  updateVocabularyValidationSchema,
  vocabularyValidationSchema,
} from "./vocabulary.validation";

const router = Router();

router.get(
  "/all-vocabulary",
  auth(USER_ROLE.admin, USER_ROLE.user),
  VocabularyController.getAllVocabulary
);

router.get(
  "/single-vocabulary/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  VocabularyController.getSingleVocabulary
);

router.post(
  "/create-vocabulary",
  auth(USER_ROLE.admin),
  validateRequest(vocabularyValidationSchema),
  VocabularyController.createVocabulary
);

router.patch(
  "/update-vocabulary/:_id",
  auth(USER_ROLE.admin),
  validateRequest(updateVocabularyValidationSchema),
  VocabularyController.updateVocabulary
);

router.delete(
  "/delete-vocabulary/:_id",
  auth(USER_ROLE.admin),
  VocabularyController.deleteVocabulary
);

export const VocabularyRoutes = router;
