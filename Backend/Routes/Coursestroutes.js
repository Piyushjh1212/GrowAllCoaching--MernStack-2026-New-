import express from "express";
import { getCoursesProducts } from "../Controllers/CoursesController.js";


const CoursesRoutes = express.Router();
CoursesRoutes.post("/Courses", getCoursesProducts);

console.log(getCoursesProducts);


export default CoursesRoutes;