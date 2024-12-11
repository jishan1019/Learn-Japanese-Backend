import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { userValidationSchema } from "../User/user.validation";
import {
  authValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/sign-in",
  validateRequest(authValidationSchema),
  AuthController.loginUser
);

router.post(
  "/sign-up",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidationSchema),
  AuthController.createUser
);

router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
