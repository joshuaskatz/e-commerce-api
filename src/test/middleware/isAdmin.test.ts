import { hash } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { Connection } from "mongoose";
import { isAdmin } from "../../middleware/isAdmin";
import { User, UserDocument } from "../../models/user";
import { testConn } from "../../test-utils/testConn";
import { generateToken } from "../../utils/generateToken";

describe("isAdmin Middleware", () => {
  let conn: Connection;
  let user: UserDocument;
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
    user = await User.create({
      username: "joshuakatz5",
      email: "josh5@example.com",
      password: await hash("password", 12),
    });
  });

  afterAll(async () => {
    await conn.close();
  });

  it("Should throw an error if user is not admin", async (done) => {
    const token: string = generateToken(user._id);
    mockRequest.headers! = { authorization: `Bearer ${token}` };

    expect(() =>
      isAdmin(mockRequest as Request, mockResponse as Response, nextFunction)
    ).rejects.toThrow();
    done();
  });
});
