import express from "express";
import { getAllCourses, getCoursesProducts } from "../Controllers/CoursesController.js";


const CoursesRoutes = express.Router();
CoursesRoutes.post("/Courses", getCoursesProducts);

CoursesRoutes.get("/all/Courses", getAllCourses);

console.log(getCoursesProducts);


export default CoursesRoutes;