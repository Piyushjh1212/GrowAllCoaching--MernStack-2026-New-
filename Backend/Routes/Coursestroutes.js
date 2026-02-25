import express from "express";
import { 
  AddCourseProduct, 
  getAllCourses, 
  getCoursesProducts, 
  getCourseWithProducts 
} from "../Controllers/CoursesController.js";

const CoursesRoutes = express.Router();

// POST: Add a course
CoursesRoutes.post("/", getCoursesProducts); // POST /api/v1/courses

// POST: Add product to a course
CoursesRoutes.post("/product", AddCourseProduct); // POST /api/v1/courses/product

// GET: Single course with products
CoursesRoutes.get("/product/:id", getCourseWithProducts); // GET /api/v1/courses/product/:id

// GET: All courses
CoursesRoutes.get("/", getAllCourses); // GET /api/v1/courses

export default CoursesRoutes;
