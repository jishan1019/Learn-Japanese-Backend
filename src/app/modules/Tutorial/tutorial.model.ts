import { model, Schema } from "mongoose";
import { TTutorial } from "./tutorial.interface";

const tutorialSchema = new Schema<TTutorial>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    videoUrl: {
      type: String,
      required: [true, "Video Url is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const TutorialModel = model<TTutorial>("Tutorial", tutorialSchema);
