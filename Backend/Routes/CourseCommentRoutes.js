import express from "express";
import { CourseaddComment, GetCourseComment } from "../Controllers/CourseCommentController.js";
import { verifyToken } from "../Middleware/Tokenverifymiddlwear.js";


const CoursesCommentRoutes = express.Router();


CoursesCommentRoutes.post('/Comments',verifyToken, CourseaddComment)

CoursesCommentRoutes.get("/get-all-comments/:lectureId", GetCourseComment)


export default CoursesCommentRoutes;
