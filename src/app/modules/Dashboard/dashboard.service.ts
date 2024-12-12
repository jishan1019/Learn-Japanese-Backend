import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { LessonModel } from "../Lesson/lesson.model";
import { VocabularyModel } from "../Vocabulary/vocabulary.model";
import { TutorialModel } from "../Tutorial/tutorial.model";

const getAllDashboardInfoFromDB = async () => {
  const user = await UserModel.find({ isDeleted: false }).select("_id");
  const lesson = await LessonModel.countDocuments();
  const vocabulary = await VocabularyModel.countDocuments();
  const tutorial = await TutorialModel.countDocuments();

  const dashInfo = {
    totalUser: user?.length || 0,
    totalLesson: lesson,
    totalVocabulary: vocabulary,
    totalTutorial: tutorial,
  };

  return dashInfo;
};

export const DashboardService = {
  getAllDashboardInfoFromDB,
};
