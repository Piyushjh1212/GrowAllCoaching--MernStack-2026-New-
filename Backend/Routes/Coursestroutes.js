import express from "express";
import { AddCourse, addLecture, addModule, getAllCourses, getCourseWithModules, getCourseWithModulesAndLectures } from "../Controllers/CoursesController.js";


const CoursesRoutes = express.Router();


// POST: Add product to a course
CoursesRoutes.post("/Courses", AddCourse); // POST /api/v1/courses/product

CoursesRoutes.post("/Courses/module", addModule); // POST /api/v1/courses/module

CoursesRoutes.post("/Courses/Lecture",addLecture); // POST /api/v1/courses/lecture



// GET: Fetch all courses
CoursesRoutes.get("/Courses", getAllCourses);

CoursesRoutes.get("/Courses/module/:id", getCourseWithModules)

// CoursesRoutes.js
CoursesRoutes.get("/Courses/:courseId/modules-with-lectures", getCourseWithModulesAndLectures);// For now, using same controller to fetch course with modules and lectures. Can be separated later if needed.



export default CoursesRoutes;
