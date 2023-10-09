import express from "express";
import bodyParser from "body-parser";
import * as coneController from "./controllers/coneController";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/computeTriangulation", coneController.computeTriangulation);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
