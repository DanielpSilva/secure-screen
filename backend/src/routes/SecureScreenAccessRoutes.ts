import express from "express";
import { SecureScreenAccessController } from "../application/controller/SecureScreenAccessController";
import { CheckIfExistsActiveSecureScreenUseCase } from "../application/useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";
import { NewSecureScreenAccessUseCase } from "../application/useCases/secureScreen/NewSecureScreenAccess";
import { DeactivateSecureScreenAccessUseCase } from "../application/useCases/secureScreen/DeactivateSecureScreenAccess";

const secureScreenRouter = express.Router();
const checkActiveSecureScreenUseCase = new CheckIfExistsActiveSecureScreenUseCase();
const newSecureScreenAccessUseCase = new NewSecureScreenAccessUseCase();
const deactivateSecureScreenAccessUseCase = new DeactivateSecureScreenAccessUseCase();
const secureScreenController = new SecureScreenAccessController(
  checkActiveSecureScreenUseCase,
  newSecureScreenAccessUseCase,
  deactivateSecureScreenAccessUseCase,
);

secureScreenRouter.post("/check-active-secure-screen-acess", (req, res, next) =>
  secureScreenController.checkActiveSecureScreenAccess(req, res, next),
);

secureScreenRouter.post("/new-secure-screen-acess", (req, res, next) =>
  secureScreenController.newSecureScreenAccess(req, res, next),
);

export { secureScreenRouter };
