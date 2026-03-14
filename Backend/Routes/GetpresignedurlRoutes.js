// routes/GetPresignedUrlRoutes.js
import express from "express";
import { getPresignedURL } from "../Controllers/Getpresignedurlcontroller.js";

const PresignedUrlRoutes = express.Router();

// ✅ Change :key to :lectureId
// frontend will call: /api/presigned/video/:lectureId
PresignedUrlRoutes.get("/video/:lectureId", getPresignedURL);

export default PresignedUrlRoutes;