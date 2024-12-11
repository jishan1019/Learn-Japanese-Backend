import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TLesson } from "./lesson.interface";
import { LessonModel } from "./lesson.model";
import { LessonSearchableField } from "./lesson.constant";

const getAllLessonFromDB = async (query: Record<string, unknown>) => {
  const tutorialQuery = new QueryBuilder(
    LessonModel.find().populate({
      path: "user",
      select: "email name",
    }),
    query
  )
    .search(LessonSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await tutorialQuery.modelQuery;
  const meta = await tutorialQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleLessonFromDB = async (id: string) => {
  const result = await TutorialModel.findById(id).populate({
    path: "user",
    select: "email name",
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }

  return result;
};

const createLessonIntroDB = async (payload: TLesson, userId: string) => {
  const result = await TutorialModel.create({
    ...payload,
    user: userId,
  });

  return result;
};

const updateLessonIntroDb = async (id: string, payload: Partial<TLesson>) => {
  const tutorial = await TutorialModel.findById(id);

  if (!tutorial) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }

  const result = await TutorialModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteLessonIntroDb = async (id: string) => {
  const result = await TutorialModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }

  return null;
};

export const LessonService = {
  getAllLessonFromDB,
  getSingleLessonFromDB,
  createLessonIntroDB,
  updateLessonIntroDb,
  deleteLessonIntroDb,
};
