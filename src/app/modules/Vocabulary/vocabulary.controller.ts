import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { VocabularyService } from "./vocabulary.service";

const getAllVocabulary = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await VocabularyService.getAllVocabularyFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Vocabulary is retrieved successfully",
    data: result,
  });
});

const getSingleVocabulary = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await VocabularyService.getSingleVocabularyFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary is retrieved successfully",
    data: result,
  });
});

const createVocabulary = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await VocabularyService.createVocabularyIntroDB(
    req.body,
    userId
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Vocabulary is create successfully",
    data: result,
  });
});

const updateVocabulary = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await VocabularyService.updateVocabularyIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary is update successfully",
    data: result,
  });
});

const deleteVocabulary = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await VocabularyService.deleteVocabularyIntroDb(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vocabulary is deleted successfully",
    data: result,
  });
});

export const VocabularyController = {
  getAllVocabulary,
  getSingleVocabulary,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
