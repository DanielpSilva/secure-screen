import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sessionRouter } from "./routes/sessionRoutes";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/sessions", sessionRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
