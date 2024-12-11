import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TVocabulary } from "./vocabulary.interface";
import { VocabularyModel } from "./vocabulary.model";
import { VocabularySearchableField } from "./vocabulary.constant";

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
  const isExistLesson = await VocabularyModel.findOne({ _id: payload.lesson });

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
  const result = await VocabularyModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Vocabulary not found");
  }

  return null;
};

export const VocabularyService = {
  getAllVocabularyFromDB,
  getSingleVocabularyFromDB,
  createVocabularyIntroDB,
  updateVocabularyIntroDb,
  deleteVocabularyIntroDb,
};
