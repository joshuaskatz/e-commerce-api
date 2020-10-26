import { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { Connection } from "mongoose";
import { UserRoles } from "../../enums";
import { isAdmin } from "../../middleware/isAdmin";
import { User, UserDocument } from "../../models/user";
import { testConn } from "../../test-utils/testConn";

describe("isAdmin Middleware", () => {
  let conn: Connection;
  let user1: UserDocument;
  let user2: UserDocument;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  beforeAll(async () => {
    conn = await testConn();
    user1 = await User.create({
      username: "joshuakatz5",
      email: "josh5@example.com",
      password: await hash("password", 12),
    });
    user2 = await User.create({
      username: "joshuakatz6",
      email: "josh6@example.com",
      password: await hash("password", 12),
      role: UserRoles.ADMIN,
    });
  });

  afterAll(async () => {
    await conn.close();
  });

  it("Should throw an error if user is not admin", async (done) => {
    mockRequest.authPayload! = { userId: user1._id };
    try {
      await isAdmin(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
    } catch (err) {
      expect(err).toMatch("error");
    }
    done();
  });

  it("Should not throw an error if admin.", async (done) => {
    mockRequest.authPayload! = { userId: user2._id };
    expect(() =>
      isAdmin(mockRequest as Request, mockResponse as Response, nextFunction)
    ).not.toThrow();
    done();
  });
});
