import { z } from "zod";
import { Role } from "./user.constant";

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    email: z.string({ required_error: "Email is required." }).email(),
    role: z.enum([...Role] as [string, ...string[]]),
    password: z.string({ required_error: "password is required." }),
  }),
});

export const updateUserValidationSchema =
  userValidationSchema.shape.body.partial();
