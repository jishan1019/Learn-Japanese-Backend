import { Schema, model } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import { Role, USER_ROLE } from "./user.constant";
import argon2 from "argon2";

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: "{VALUE} is not a valid role",
      },
      required: [true, "Role is required"],
      default: USER_ROLE.user,
    },
    photo: {
      type: String,
      required: [true, "Profile img is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;

    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.post("save", function (user, next) {
  user.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false }).select("+password");
};

userSchema.statics.isPasswordMatch = async function (dbUserPass, payloadPass) {
  const result = await argon2.verify(dbUserPass, payloadPass);

  return result;
};

const UserModel = model<TUser, TUserModel>("User", userSchema);

export { UserModel };
