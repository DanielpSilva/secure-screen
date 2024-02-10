import express from "express";
import { CreateSessionUseCase } from "../application/useCases/create-session";
import { SessionController } from "../application/controllers/sessionController";

const sessionRouter = express.Router();
const createSessionUseCase = new CreateSessionUseCase();
const sessionController = new SessionController(createSessionUseCase);

sessionRouter.post("/create-session", (req, res) =>
  sessionController.createSession(req, res),
);

export { sessionRouter };
