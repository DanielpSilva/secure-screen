import express from "express";
import { CreateSessionUseCase } from "../application/useCases/session/create-session";
import { SessionController } from "../application/controller/session-controller";

const sessionRouter = express.Router();
const createSessionUseCase = new CreateSessionUseCase();
const sessionController = new SessionController(createSessionUseCase);

sessionRouter.post("/create-session", (req, res) => sessionController.createSession(req, res));

export { sessionRouter };
