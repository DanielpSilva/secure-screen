import { Request, Response } from "express";
import { CreateSessionUseCase } from "../useCases/session/create-session";

export class SessionController {
  private createSessionUseCase: CreateSessionUseCase;

  constructor(createSessionUseCase: CreateSessionUseCase) {
    this.createSessionUseCase = createSessionUseCase;
  }

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const session = await this.createSessionUseCase.execute();

      res.status(201).json({
        message: "Session created with sucess!",
        timestamp: new Date().getTime(),
        data: session,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
