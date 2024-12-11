import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TTutorial } from "./tutorial.interface";
import { TutorialModel } from "./tutorial.model";

const getAllTutorialFromDB = async (query: Record<string, unknown>) => {
  const tutorialQuery = new QueryBuilder(
    TutorialModel.find().populate({
      path: "user",
      select: "email name",
    }),
    query
  )
    .search([])
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

const getSingleTutorialFromDB = async (id: string) => {
  const result = await TutorialModel.findById(id).populate({
    path: "user",
    select: "email name",
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }

  return result;
};

const createTutorialIntroDB = async (payload: TTutorial, userId: string) => {
  const result = await TutorialModel.create({
    ...payload,
    user: userId,
  });

  return result;
};

const updateTutorialIntroDb = async (
  id: string,
  payload: Partial<TTutorial>
) => {
  const tutorial = await TutorialModel.findById(id);

  if (!tutorial) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }

  const result = await TutorialModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteTutorialIntroDb = async (id: string) => {
  const result = await TutorialModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }

  return null;
};

export const TutorialService = {
  getAllTutorialFromDB,
  getSingleTutorialFromDB,
  createTutorialIntroDB,
  updateTutorialIntroDb,
  deleteTutorialIntroDb,
};
