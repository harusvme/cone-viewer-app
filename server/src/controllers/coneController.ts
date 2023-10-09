import { Request, Response } from "express";
import * as coneService from "../services/coneService";

export const computeTriangulation = (req: Request, res: Response) => {
  const { height, radius, segments } = req.body;

  try {
    const triangulation = coneService.calculateTriangulation(
      height,
      radius,
      segments
    );
    res.json({ triangulation });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
