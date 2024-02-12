import { Request, Response } from "express";
import { CheckIfExistsActiveSecurePageUseCase } from "../useCases/securePage/CheckIfExistsActiveSecurePageAccess";
import { ValidationRequestError } from "../../errors/ValidationRequestError";
import { NewSecurePageAccessUseCase } from "../useCases/securePage/NewSecurePageAccess";
import { DisableSecurePageAccessUseCase } from "../useCases/securePage/DisableSecurePageAccess";

export class SecurePageAccessController {
  private checkActiveSecurePageUseCase: CheckIfExistsActiveSecurePageUseCase;
  private newSecurePageAccesUseCase: NewSecurePageAccessUseCase;
  private disableSecurePageAccessUseCase: DisableSecurePageAccessUseCase;

  constructor(
    checkActiveSecurePageUseCase: CheckIfExistsActiveSecurePageUseCase,
    newSecurePageAccessUseCase: NewSecurePageAccessUseCase,
    disableSecurePageAccessUseCase: DisableSecurePageAccessUseCase,
  ) {
    this.checkActiveSecurePageUseCase = checkActiveSecurePageUseCase;
    this.newSecurePageAccesUseCase = newSecurePageAccessUseCase;
    this.disableSecurePageAccessUseCase = disableSecurePageAccessUseCase;
  }

  async newSecurePageAccess(req: Request, res: Response): Promise<void> {
    try {
      const { path, session_id } = req.body;

      if (!req.body || !path || !session_id) {
        throw new ValidationRequestError("Invalid Request");
      }

      const securePageAccess = this.newSecurePageAccesUseCase.execute({ session_id, path });

      res.status(200).json({ securePageAccess });
    } catch (error) {
      if (error instanceof ValidationRequestError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async checkActiveSecurePageAccess(req: Request, res: Response): Promise<void> {
    try {
      const { path } = req.body;

      if (!req.body || !path) {
        throw new ValidationRequestError("Invalid Request");
      }

      const isActive = this.checkActiveSecurePageUseCase.execute({ path });

      res.status(200).json({
        isActive: isActive,
      });
    } catch (error) {
      if (error instanceof ValidationRequestError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async disableSecurePageAcess(req: Request, res: Response): Promise<void> {
    try {
      const { session_id } = req.body;

      if (req.body || session_id) {
        throw new ValidationRequestError("Invalid Request");
      }

      const session = this.disableSecurePageAccessUseCase.execute(session_id);

      res.status(200).json({
        data: session,
      });
    } catch (error) {
      if (error instanceof ValidationRequestError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
