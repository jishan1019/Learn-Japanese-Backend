import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TLesson } from "./lesson.interface";
import { LessonModel } from "./lesson.model";
import { LessonSearchableField } from "./lesson.constant";
import { VocabularyModel } from "../Vocabulary/vocabulary.model";
import mongoose from "mongoose";

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
  const result = await LessonModel.findById(id).populate({
    path: "user",
    select: "email name",
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  return result;
};

const createLessonIntroDB = async (payload: TLesson, userId: string) => {
  const lowerCaseName = payload.name.toLowerCase();

  const isExistLesson = await LessonModel.findOne({
    $or: [{ name: lowerCaseName }, { number: payload.number }],
  });

  if (isExistLesson) {
    throw new AppError(httpStatus.NOT_FOUND, "This lesson already exists");
  }

  const newPayload = {
    user: userId,
    name: lowerCaseName,
    number: payload.number,
  };

  const result = await LessonModel.create(newPayload);

  return result;
};

const updateLessonIntroDb = async (id: string, payload: Partial<TLesson>) => {
  const lesson = await LessonModel.findById(id);

  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  if (payload.name) {
    const lowerCaseName = payload.name.toLowerCase();

    const isExistLesson = await LessonModel.findOne({
      _id: { $ne: id },
      name: lowerCaseName,
    });

    if (isExistLesson) {
      throw new AppError(httpStatus.NOT_FOUND, "This lesson already exists");
    }
  }

  if (payload.number) {
    const isExistLesson = await LessonModel.findOne({
      _id: { $ne: id },
      number: payload.number,
    });

    if (isExistLesson) {
      throw new AppError(httpStatus.NOT_FOUND, "This lesson no already exists");
    }
  }

  const result = await LessonModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteLessonIntroDb = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const lesson = await LessonModel.findOne({ _id: id }).session(session);
    if (!lesson) {
      throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
    }

    const lessonResult = await LessonModel.deleteOne({ _id: id }).session(
      session
    );
    if (!lessonResult.deletedCount) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete lesson");
    }

    const vocabularyResult = await VocabularyModel.deleteMany({
      lesson: id,
    }).session(session);
    if (!vocabularyResult.deletedCount) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete vocabulary");
    }

    await session.commitTransaction();
    session.endSession();

    return null;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const LessonService = {
  getAllLessonFromDB,
  getSingleLessonFromDB,
  createLessonIntroDB,
  updateLessonIntroDb,
  deleteLessonIntroDb,
};
