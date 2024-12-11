import { Types } from "mongoose";

export type TTutorial = {
  user: Types.ObjectId;
  title: string;
  videoUrl: string;
  description: string;
};
