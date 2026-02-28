import express from "express";
import { addCloudinaryimage, addCloudinaryVideo } from "../Controllers/Cloudinarycontroller.js";
import { imageParser, videoParser} from "../Middleware/CloudinaryMiidlewear.js";

const CloudinaryRoutes = express.Router();

// CloudinaryRoutes.post("/", upload.fields([ { name: "Moduleimage", maxCount: 1 },{ name: "Modulevideo", maxCount: 1 }]), addCloudinaryImage);
CloudinaryRoutes.post("/upload", imageParser.single("file"), addCloudinaryimage);

// Video upload
CloudinaryRoutes.post("/upload-video", videoParser.single("file"), addCloudinaryVideo);

export default CloudinaryRoutes;