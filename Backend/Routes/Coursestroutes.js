import express from "express";
import { AddCourse, addModule, getAllCourses } from "../Controllers/CoursesController.js";


const CoursesRoutes = express.Router();


// POST: Add product to a course
CoursesRoutes.post("/Courses", AddCourse); // POST /api/v1/courses/product

CoursesRoutes.post("/Courses/module", addModule); // POST /api/v1/courses/module

// GET: Fetch all courses
CoursesRoutes.get("/Courses", getAllCourses);



export default CoursesRoutes;
