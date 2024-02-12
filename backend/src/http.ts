import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { sessionRouter } from "./routes/SessionRoutes";
import { SecureScreenRouter } from "./routes/SecureScreenAccessRoutes";
import { errorHandler } from "./utils/ErrorHandle";

const app = express();

app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server);

//Routes
app.use("/session", sessionRouter);
app.use("/secure-page-access", SecureScreenRouter);

app.use(errorHandler);

export { server, io };