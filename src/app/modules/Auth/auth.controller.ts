import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserFromDb(req.body);

  const { accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: accessToken,
  });
});

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUserIntroDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User is create successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.generateNewRefreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token generate Successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  createUser,
  refreshToken,
};
