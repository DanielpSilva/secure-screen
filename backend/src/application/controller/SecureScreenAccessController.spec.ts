import { Request, Response, NextFunction } from "express";
import { SecureScreenAccessController } from "./SecureScreenAccessController";
import { CheckIfExistsActiveSecureScreenUseCase } from "../useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";

jest.mock("../useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess", () => {
  return {
    CheckIfExistsActiveSecureScreenUseCase: jest.fn().mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue(true),
      };
    }),
  };
});

describe("SecureScreenAccessController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      body: {
        path: "testPath",
      },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test("should return 200 and isActive true when path is provided", async () => {
    const checkActiveSecureScreenUseCase = new CheckIfExistsActiveSecureScreenUseCase();
    const controller = new SecureScreenAccessController(checkActiveSecureScreenUseCase);

    await controller.checkActiveSecureScreenAccess(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(true);
  });
});
