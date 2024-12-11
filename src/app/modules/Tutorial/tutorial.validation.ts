import { z } from "zod";

export const tutorialValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "title is required." }),
    videoUrl: z.string({ required_error: "Video Url is required." }),
    description: z.string({ required_error: "description is required." }),
  }),
});

export const updateTutorialValidationSchema =
  tutorialValidationSchema.shape.body.partial();
