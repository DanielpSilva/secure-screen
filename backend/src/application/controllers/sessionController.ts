import { Request, Response } from "express";
import { CreateSessionUseCase } from "../useCases/create-session";

export class SessionController {
  private createSessionUseCase: CreateSessionUseCase;

  constructor(createSessionUseCase: CreateSessionUseCase) {
    this.createSessionUseCase = createSessionUseCase;
  }

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const { createdAt } = req.body;
      const session = await this.createSessionUseCase.execute({ createdAt });

      res.status(201).json({
        message: "Sessão criada com sucesso!",
        session,
      });
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
