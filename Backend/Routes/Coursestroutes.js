import express from "express";
import { AddCourse, getAllCourses } from "../Controllers/CoursesController.js";


const CoursesRoutes = express.Router();


// POST: Add product to a course
CoursesRoutes.post("/Courses", AddCourse); // POST /api/v1/courses/product

// GET: Fetch all courses
CoursesRoutes.get("/Courses", getAllCourses);



export default CoursesRoutes;
