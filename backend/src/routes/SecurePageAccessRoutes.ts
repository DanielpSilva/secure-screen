import express from "express";
import { SecurePageAccessController } from "../application/controller/secure-page-access-controller";
import { CheckActiveSecurePageUseCase } from "../application/useCases/secure-page/check-active-secure-page-access";
import { NewSecurePageAccessUseCase } from "../application/useCases/secure-page/new-secure-page-access";

const securePageRouter = express.Router();
const checkActiveSecurePageUseCase = new CheckActiveSecurePageUseCase();
const newSecurePageAccessUseCase = new NewSecurePageAccessUseCase();
const securePageController = new SecurePageAccessController(checkActiveSecurePageUseCase, newSecurePageAccessUseCase);

securePageRouter.post("/check-active-secure-page-acess", (req, res) =>
  securePageController.checkActiveSecurePageAccess(req, res),
);

securePageRouter.post("/new-secure-page-acess", (req, res) => securePageController.newSecurePageAccess(req, res));

export { securePageRouter };
