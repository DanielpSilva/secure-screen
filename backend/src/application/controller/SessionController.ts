import { NextFunction, Request, Response } from "express";
import { CreateSessionUseCase } from "../useCases/session/NewSession";

export class SessionController {
  private createSessionUseCase: CreateSessionUseCase;

  constructor(createSessionUseCase: CreateSessionUseCase) {
    this.createSessionUseCase = createSessionUseCase;
  }

  async createSession(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const session = await this.createSessionUseCase.execute();

      res.status(201).json({
        message: "Session created with sucess!",
        timestamp: new Date().getTime(),
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }
}
