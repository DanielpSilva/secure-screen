import { NextFunction, Request, Response } from "express";
import { NewSecureScreenAccessUseCase } from "../useCases/secureScreen/NewSecureScreenAccess";
import { DeactivateSecureScreenAccessUseCase } from "../useCases/secureScreen/DeactivateSecureScreenAccess";
import { ValidationRequestError } from "../../errors/ValidationRequestError";
import { CheckIfExistsActiveSecureScreenUseCase } from "../useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";

export class SecureScreenAccessController {
  private checkActiveSecureScreenUseCase: CheckIfExistsActiveSecureScreenUseCase;
  private newSecureScreenAccesUseCase: NewSecureScreenAccessUseCase;
  private deactivateSecureScreenAccessUseCase: DeactivateSecureScreenAccessUseCase;

  constructor(
    checkActiveSecureScreenUseCase: CheckIfExistsActiveSecureScreenUseCase,
    newSecureScreenAccessUseCase: NewSecureScreenAccessUseCase,
    deactivateSecureScreenAccessUseCase: DeactivateSecureScreenAccessUseCase,
  ) {
    this.checkActiveSecureScreenUseCase = checkActiveSecureScreenUseCase;
    this.newSecureScreenAccesUseCase = newSecureScreenAccessUseCase;
    this.deactivateSecureScreenAccessUseCase = deactivateSecureScreenAccessUseCase;
  }

  async newSecureScreenAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { path, session_id } = req.body;

      if (!req.body || !path || !session_id) {
        throw new ValidationRequestError("Invalid Request");
      }

      const SecureScreenAccess = this.newSecureScreenAccesUseCase.execute({ session_id, path });

      res.status(200).json({ SecureScreenAccess });
    } catch (error) {
      next(error);
    }
  }

  async checkActiveSecureScreenAccess(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { path } = req.body;

      if (!req.body || !path) {
        throw new ValidationRequestError("Invalid Request");
      }

      const isActive = await this.checkActiveSecureScreenUseCase.execute({ path });

      res.status(200).json(isActive);
    } catch (error) {
      next(error);
    }
  }

  async disableSecureScreenAcess(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { session_id } = req.body;

      if (req.body || session_id) {
        throw new ValidationRequestError("Invalid Request");
      }

      const session = this.deactivateSecureScreenAccessUseCase.execute(session_id);

      res.status(200).json({
        data: session,
      });
    } catch (error) {
      next(error);
    }
  }
}
