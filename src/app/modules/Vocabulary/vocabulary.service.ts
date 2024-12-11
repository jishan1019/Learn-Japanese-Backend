import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TVocabulary } from "./vocabulary.interface";
import { VocabularyModel } from "./vocabulary.model";
import { VocabularySearchableField } from "./vocabulary.constant";
import { LessonModel } from "../Lesson/lesson.model";
import mongoose from "mongoose";

const getAllVocabularyFromDB = async (query: Record<string, unknown>) => {
  const vocabularyQuery = new QueryBuilder(
    VocabularyModel.find()
      .populate({
        path: "user",
        select: "email name",
      })
      .populate({
        path: "lesson",
        select: "name number",
      }),
    query
  )
    .search(VocabularySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await vocabularyQuery.modelQuery;
  const meta = await vocabularyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleVocabularyFromDB = async (id: string) => {
  const result = await VocabularyModel.findById(id).populate({
    path: "user",
    select: "email name",
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  return result;
};

const createVocabularyIntroDB = async (
  payload: TVocabulary,
  userId: string
) => {
  const isExistLesson = await LessonModel.findOne({ _id: payload.lesson });

  if (!isExistLesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  const newPayload = {
    ...payload,
    user: userId,
  };

  const result = await VocabularyModel.create(newPayload);

  return result;
};

const updateVocabularyIntroDb = async (
  id: string,
  payload: Partial<TVocabulary>
) => {
  const lesson = await VocabularyModel.findById(id);

  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  }

  const result = await VocabularyModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteVocabularyIntroDb = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const vocabulary = await VocabularyModel.findById(id).session(session);

    if (!vocabulary) {
      throw new AppError(httpStatus.NOT_FOUND, "Vocabulary not found");
    }

    const result = await VocabularyModel.deleteOne({ _id: id }).session(
      session
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete vocabulary");
    }

    const lessonUpdate = await LessonModel.updateOne(
      { _id: vocabulary.lesson },
      { $inc: { vocabulary: -1 } }
    ).session(session);

    if (!lessonUpdate) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update vocabulary count in lesson"
      );
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

export const VocabularyService = {
  getAllVocabularyFromDB,
  getSingleVocabularyFromDB,
  createVocabularyIntroDB,
  updateVocabularyIntroDb,
  deleteVocabularyIntroDb,
};
