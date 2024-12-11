import { Types } from "mongoose";

export type TVocabulary = {
  user: Types.ObjectId;
  word: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  lesson: Types.ObjectId;
};
