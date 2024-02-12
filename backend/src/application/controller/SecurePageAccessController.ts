import { NextFunction, Request, Response } from "express";
import { CheckIfExistsActiveSecurePageUseCase } from "../useCases/securePage/CheckIfExistsActiveSecurePageAccess";
import { ValidationRequestError } from "../../errors/ValidationRequestError";
import { NewSecurePageAccessUseCase } from "../useCases/securePage/NewSecurePageAccess";
import { DeactivateSecurePageAccessUseCase } from "../useCases/securePage/DeactivateSecurePageAccess";

export class SecurePageAccessController {
  private checkActiveSecurePageUseCase: CheckIfExistsActiveSecurePageUseCase;
  private newSecurePageAccesUseCase: NewSecurePageAccessUseCase;
  private deactivateSecurePageAccessUseCase: DeactivateSecurePageAccessUseCase;

  constructor(
    checkActiveSecurePageUseCase: CheckIfExistsActiveSecurePageUseCase,
    newSecurePageAccessUseCase: NewSecurePageAccessUseCase,
    deactivateSecurePageAccessUseCase: DeactivateSecurePageAccessUseCase,
  ) {
    this.checkActiveSecurePageUseCase = checkActiveSecurePageUseCase;
    this.newSecurePageAccesUseCase = newSecurePageAccessUseCase;
    this.deactivateSecurePageAccessUseCase = deactivateSecurePageAccessUseCase;
  }

  async newSecurePageAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { path, session_id } = req.body;

      if (!req.body || !path || !session_id) {
        throw new ValidationRequestError("Invalid Request");
      }

      const securePageAccess = this.newSecurePageAccesUseCase.execute({ session_id, path });

      res.status(200).json({ securePageAccess });
    } catch (error) {
      next(error);
    }
  }

  async checkActiveSecurePageAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      next(error);
    }
  }

  async disableSecurePageAcess(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { session_id } = req.body;

      if (req.body || session_id) {
        throw new ValidationRequestError("Invalid Request");
      }

      const session = this.deactivateSecurePageAccessUseCase.execute(session_id);

      res.status(200).json({
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }
}
