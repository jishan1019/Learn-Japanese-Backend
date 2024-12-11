import { Model } from "mongoose";

export type TRole = "user" | "admin";

export type TUser = {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: TRole;
  isDeleted?: boolean;
};

export interface TUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(dbUserPass: string, payloadPass: string): Promise<boolean>;
}
