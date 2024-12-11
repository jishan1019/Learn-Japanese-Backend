import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createToken = (
  jwtPayload: { userId: Types.ObjectId; role: string },
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn: expiresIn,
  });
};

export const splitToken = (token: string | undefined): string | undefined => {
  let splitToken;

  if (token) {
    const split = token.split(" ");
    splitToken = split[1];
  }

  return splitToken;
};
