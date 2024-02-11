import { Request, Response } from "express";
import { CheckActiveSecurePageUseCase } from "../useCases/secure-page/check-active-secure-page";

export class SecurePageController {
  private checkActiveSecurePageUseCase: CheckActiveSecurePageUseCase;

  constructor(checkActiveSecurePageUseCase: CheckActiveSecurePageUseCase) {
    this.checkActiveSecurePageUseCase = checkActiveSecurePageUseCase;
  }

  async checkActiveSecurePage(req: Request, res: Response): Promise<void> {
    try {
      const { path } = req.body;
      const isActive = this.checkActiveSecurePageUseCase.execute({ path });

      res.status(200).json({
        isActive: isActive,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
