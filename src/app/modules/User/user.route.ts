import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./user.constant";
import { updateUserValidationSchema } from "./user.validation";
import auth from "../../middlewares/auth";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/all-user", auth(USER_ROLE.admin), UserController.getAllUser);

router.get(
  "/single-user/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getSingleUser
);

router.patch(
  "/update-user/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(updateUserValidationSchema),
  UserController.updateUser
);

router.delete(
  "/delete-user/:_id",
  auth(USER_ROLE.admin),
  UserController.deleteUser
);

router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), UserController.getMe);

export const UserRoutes = router;
