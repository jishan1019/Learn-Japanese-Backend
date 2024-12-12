import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DashboardService } from "./dashboard.service";

const getAllDashboardInfo = catchAsync(async (req, res) => {
  const result = await DashboardService.getAllDashboardInfoFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard info is retrieved successfully",
    data: result,
  });
});

export const DashboardController = {
  getAllDashboardInfo,
};
