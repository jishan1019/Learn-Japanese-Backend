import { model, Schema } from "mongoose";
import { TVocabulary } from "./vocabulary.interface";

const vocabularySchema = new Schema<TVocabulary>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
    },
    word: {
      type: String,
      trim: true,
      required: [true, "word is required"],
    },
    meaning: {
      type: String,
      trim: true,
      required: [true, "meaning is required"],
    },
    pronunciation: {
      type: String,
      trim: true,
      required: [true, "pronunciation is required"],
    },
    whenToSay: {
      type: String,
      trim: true,
      required: [true, "whenToSay is required"],
    },
    lesson: {
      type: Schema.Types.ObjectId,
      required: [true, "lesson id is required"],
      ref: "Lesson",
    },
  },
  {
    timestamps: true,
  }
);

export const VocabularyModel = model<TVocabulary>(
  "Vocabulary",
  vocabularySchema
);
