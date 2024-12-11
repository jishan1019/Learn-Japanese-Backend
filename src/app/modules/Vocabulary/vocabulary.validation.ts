import { z } from "zod";

export const lessonValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "lesson name is required." }),
    number: z.number({ required_error: "lesson number is required." }),
  }),
});

export const updateLessonValidationSchema =
  lessonValidationSchema.shape.body.partial();
