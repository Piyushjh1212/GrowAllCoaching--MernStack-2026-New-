import express from "express";
import { addCloudinaryImage } from "../Controllers/Cloudinarycontroller.js";
import { imageParser} from "../Middleware/CloudinaryMiidlewear.js";

const CloudinaryRoutes = express.Router();

// CloudinaryRoutes.post("/", upload.fields([ { name: "Moduleimage", maxCount: 1 },{ name: "Modulevideo", maxCount: 1 }]), addCloudinaryImage);
CloudinaryRoutes.post("/upload", imageParser.single("file"), addCloudinaryImage);

export default CloudinaryRoutes;