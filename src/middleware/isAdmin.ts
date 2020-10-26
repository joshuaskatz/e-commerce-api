import { NextFunction, Request } from "express";
import { UserRoles } from "../enums";
import { User, UserDocument } from "../models/user";

export const isAdmin = async (req: Request, __: any, next: NextFunction) => {
  const { userId } = req.authPayload;

  User.findOne({ _id: userId, role: UserRoles.ADMIN })
    .then((user: UserDocument | null) => {
      if (user) {
        next();
      } else {
        throw new Error("Not Admin!");
      }
    })
    .catch((error) => {
      next(error);
    });
};
