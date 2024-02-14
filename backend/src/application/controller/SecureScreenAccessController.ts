import { NextFunction, Request, Response } from "express";

import { ValidationRequestError } from "../../errors/ValidationRequestError";
import { CheckIfExistsActiveSecureScreenUseCase } from "../useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";

export class SecureScreenAccessController {
  private checkActiveSecureScreenUseCase: CheckIfExistsActiveSecureScreenUseCase;

  constructor(checkActiveSecureScreenUseCase: CheckIfExistsActiveSecureScreenUseCase) {
    this.checkActiveSecureScreenUseCase = checkActiveSecureScreenUseCase;
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
}
