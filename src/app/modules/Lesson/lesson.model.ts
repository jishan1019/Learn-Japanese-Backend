import { model, Schema } from "mongoose";
import { TLesson } from "./lesson.interface";

const lessonSchema = new Schema<TLesson>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
      required: [true, "lesson name is required"],
      unique: true,
    },
    number: {
      type: Number,
      trim: true,
      required: [true, "lesson number is required"],
      unique: true,
    },
    vocabulary: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const LessonModel = model<TLesson>("Lesson", lessonSchema);
