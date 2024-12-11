import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { LessonService } from "./vocabulary.service";

const getAllLesson = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await LessonService.getAllLessonFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Lesson is retrieved successfully",
    data: result,
  });
});

const getSingleLesson = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await LessonService.getSingleLessonFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson is retrieved successfully",
    data: result,
  });
});

const createLesson = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await LessonService.createLessonIntroDB(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Lesson is create successfully",
    data: result,
  });
});

const updateLesson = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await LessonService.updateLessonIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson is update successfully",
    data: result,
  });
});

const deleteLesson = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await LessonService.deleteLessonIntroDb(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson is deleted successfully",
    data: result,
  });
});

export const LessonController = {
  getAllLesson,
  getSingleLesson,
  createLesson,
  updateLesson,
  deleteLesson,
};
