import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TutorialService } from "./tutorial.service";

const createTutorial = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await TutorialService.createTutorialIntroDB(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tutorial is create successfully",
    data: result,
  });
});

export const TutorialController = {
  createTutorial,
};
