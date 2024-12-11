import { Model } from "mongoose";
import { TUserRole } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  photo: string;
  password: string;
  role: TUserRole;
  isDeleted?: boolean;
};

export interface TUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(dbUserPass: string, payloadPass: string): Promise<boolean>;
}
