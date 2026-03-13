import express from "express";
import { uploadVideotoAWS } from "../Controllers/AWSvideoController.js";
import { uploadVideoMiddleware } from "../Middleware/AWSMiddlewear.js";

const AWSRoutes = express.Router();

AWSRoutes.post("/Video-upload", uploadVideoMiddleware, uploadVideotoAWS)

export default AWSRoutes;