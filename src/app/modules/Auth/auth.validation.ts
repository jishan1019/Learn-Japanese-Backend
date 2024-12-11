import { z } from "zod";

const authValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email(),
    password: z.string({ required_error: "password is required." }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});

export { authValidationSchema, refreshTokenValidationSchema };
