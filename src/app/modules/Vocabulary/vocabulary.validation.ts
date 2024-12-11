import { z } from "zod";

export const vocabularyValidationSchema = z.object({
  body: z.object({
    word: z.string({ required_error: "word is required." }),
    meaning: z.string({ required_error: "meaning is required." }),
    pronunciation: z.string({ required_error: "pronunciation is required." }),
    whenToSay: z.string({ required_error: "whenToSay is required." }),
    lesson: z.string({ required_error: "lesson is required." }),
  }),
});

export const updateVocabularyValidationSchema =
  vocabularyValidationSchema.shape.body.partial();
