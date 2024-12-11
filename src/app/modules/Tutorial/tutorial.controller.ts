import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TutorialService } from "./tutorial.service";

const getAllTutorial = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await TutorialService.getAllTutorialFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Tutorial is retrieved successfully",
    data: result,
  });
});

const getSingleTutorial = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await TutorialService.getSingleTutorialFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutorial is retrieved successfully",
    data: result,
  });
});

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

const updateTutorial = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await TutorialService.updateTutorialIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutorial is update successfully",
    data: result,
  });
});

const deleteTutorial = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await TutorialService.deleteTutorialIntroDb(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tutorial is deleted successfully",
    data: result,
  });
});

export const TutorialController = {
  getAllTutorial,
  getSingleTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial,
};
