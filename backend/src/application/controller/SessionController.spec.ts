import { Request, Response, NextFunction } from "express";
import { SessionController } from "./SessionController";
import { CreateSessionUseCase } from "../useCases/session/NewSession";

jest.mock("../useCases/session/NewSession", () => {
  return {
    CreateSessionUseCase: jest.fn().mockImplementation(() => {
      return {
        execute: jest.fn().mockResolvedValue({ id: crypto.randomUUID(), created_at: new Date() }),
      };
    }),
  };
});

describe("SessionController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  test("should create a session and return 201 status code", async () => {
    const createSessionUseCase = new CreateSessionUseCase();
    const controller = new SessionController(createSessionUseCase);

    await controller.createSession(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Session created with sucess!",
        data: expect.any(Object),
        timestamp: expect.any(Number),
      }),
    );
  });
});
