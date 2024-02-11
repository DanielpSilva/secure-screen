import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { appDataSource } from "./infrastructure/database/app-data-source";
import { sessionRouter } from "./routes/sessionRoutes";
import { securePageRouter } from "./routes/securePageRoutes";

appDataSource
  .initialize()
  .then(() => {})
  .catch((error) => console.log(error));

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/sessions", sessionRouter);
app.use("/secure-page", securePageRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
