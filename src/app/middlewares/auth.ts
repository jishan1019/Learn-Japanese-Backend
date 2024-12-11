import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/User/user.model";
import { TUserRole } from "../modules/User/user.constant";
import { splitToken } from "../modules/Auth/auth.utils";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = splitToken(req.headers.authorization);

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token not found");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { userId, role } = decoded;

    const user = await UserModel.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
