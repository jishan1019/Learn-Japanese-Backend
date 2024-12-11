import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { userValidationSchema } from "../User/user.validation";
import {
  authValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/sign-in",
  validateRequest(authValidationSchema),
  AuthController.loginUser
);

router.post(
  "/sign-up",
  validateRequest(userValidationSchema),
  AuthController.createUser
);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
