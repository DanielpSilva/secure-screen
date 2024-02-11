import express from "express";
import { SecurePageController } from "../application/controller/secure-page-controller";
import { CheckActiveSecurePageUseCase } from "../application/useCases/secure-page/check-active-secure-page";

const securePageRouter = express.Router();
const checkActiveSecurePageUseCase = new CheckActiveSecurePageUseCase();
const securePageController = new SecurePageController(checkActiveSecurePageUseCase);

securePageRouter.post("/check-active-secure-page", (req, res) => securePageController.checkActiveSecurePage(req, res));

export { securePageRouter };
