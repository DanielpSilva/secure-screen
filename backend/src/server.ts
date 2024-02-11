import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { sessionRouter } from "./routes/SessionRoutes";
import { securePageRouter } from "./routes/SecurePageRoutes";
import { runMigrations } from "./infrastructure/run-migrations";
import { appDataSource } from "./app-data-source";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use("/sessions", sessionRouter);
app.use("/secure-page", securePageRouter);

appDataSource
  .initialize()
  .then(async () => {
    await runMigrations();
    startServer();
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
