import express from "express";
import { SecurePageAccessController } from "../application/controller/SecurePageAccessController";
import { CheckIfExistsActiveSecurePageUseCase } from "../application/useCases/securePage/CheckIfExistsActiveSecurePageAccess";
import { NewSecurePageAccessUseCase } from "../application/useCases/securePage/NewSecurePageAccess";
import { DeactivateSecurePageAccessUseCase } from "../application/useCases/securePage/DeactivateSecurePageAccess";

const securePageRouter = express.Router();
const checkActiveSecurePageUseCase = new CheckIfExistsActiveSecurePageUseCase();
const newSecurePageAccessUseCase = new NewSecurePageAccessUseCase();
const deactivateSecurePageAccessUseCase = new DeactivateSecurePageAccessUseCase();
const securePageController = new SecurePageAccessController(
  checkActiveSecurePageUseCase,
  newSecurePageAccessUseCase,
  deactivateSecurePageAccessUseCase,
);

securePageRouter.post("/check-active-secure-page-acess", (req, res, next) =>
  securePageController.checkActiveSecurePageAccess(req, res, next),
);

securePageRouter.post("/new-secure-page-acess", (req, res, next) =>
  securePageController.newSecurePageAccess(req, res, next),
);

export { securePageRouter };
