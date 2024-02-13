import express from "express";
import { SecureScreenAccessController } from "../application/controller/SecureScreenAccessController";
import { CheckIfExistsActiveSecureScreenUseCase } from "../application/useCases/secureScreen/CheckIfExistsActiveSecureScreenAccess";

const secureScreenRouter = express.Router();
const checkActiveSecureScreenUseCase = new CheckIfExistsActiveSecureScreenUseCase();

const secureScreenController = new SecureScreenAccessController(checkActiveSecureScreenUseCase);

secureScreenRouter.post("/check-active-secure-screen-acess", (req, res, next) =>
  secureScreenController.checkActiveSecureScreenAccess(req, res, next),
);

export { secureScreenRouter };
