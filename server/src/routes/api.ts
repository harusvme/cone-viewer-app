import express, { Application } from "express";
import bodyParser from "body-parser";
import * as coneController from "../controllers/coneController";

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/api/computeTriangulation", coneController.computeTriangulation);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
