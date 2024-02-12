import express from "express";
import { SecureScreenAccessController } from "../application/controller/SecureScreenAccessController";
import { CheckIfExistsActiveSecureScreenUseCase } from "../application/useCases/SecureScreen/CheckIfExistsActiveSecureScreenAccess";
import { NewSecureScreenAccessUseCase } from "../application/useCases/SecureScreen/NewSecureScreenAccess";
import { DeactivateSecureScreenAccessUseCase } from "../application/useCases/SecureScreen/DeactivateSecureScreenAccess";

const SecureScreenRouter = express.Router();
const checkActiveSecureScreenUseCase = new CheckIfExistsActiveSecureScreenUseCase();
const newSecureScreenAccessUseCase = new NewSecureScreenAccessUseCase();
const deactivateSecureScreenAccessUseCase = new DeactivateSecureScreenAccessUseCase();
const SecureScreenController = new SecureScreenAccessController(
  checkActiveSecureScreenUseCase,
  newSecureScreenAccessUseCase,
  deactivateSecureScreenAccessUseCase,
);

SecureScreenRouter.post("/check-active-secure-page-acess", (req, res, next) =>
  SecureScreenController.checkActiveSecureScreenAccess(req, res, next),
);

SecureScreenRouter.post("/new-secure-page-acess", (req, res, next) =>
  SecureScreenController.newSecureScreenAccess(req, res, next),
);

export { SecureScreenRouter };
