import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "./user.model";
import { TUser } from "./user.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const updateUserIntroDb = async (id: string, payload: Partial<TUser>) => {
  const user = await UserModel.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSingleUserFromDB = async (id: string) => {
  const user = await UserModel.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await UserModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return null;
};

const getMeFromDb = async (id: string) => {
  const user = await UserModel.findOne({ _id: id }, { isDeleted: false });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not exists.");
  }

  return user;
};

export const UserService = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntroDb,
  deleteSingleUserFromDB,
  getMeFromDb,
};
