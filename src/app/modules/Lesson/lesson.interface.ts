import { Types } from "mongoose";

export type TLesson = {
  user: Types.ObjectId;
  name: string;
  number: number;
};
