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
      required: [true, "lesson name is required"],
    },
    number: {
      type: Number,
      required: [true, "lesson number is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const LessonModel = model<TLesson>("Lesson", lessonSchema);
