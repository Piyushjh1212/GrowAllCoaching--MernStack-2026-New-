import express from 'express';
import { AdminDashboardController, AdminLoginController, AdminRegisterController } from '../Controllers/AdminLoginController.js';
import { customSanitize } from '../Middleware/CustomSanitizecloneMiddlewear.js';
import { adminProtect, AdminRegisterLimiter } from '../Middleware/Userauthmiddlewear.js';

const AdminLoginRoute  = express.Router();

AdminLoginRoute.post("/Register",customSanitize, AdminRegisterLimiter, AdminRegisterController);

AdminLoginRoute.post("/login",customSanitize,  AdminLoginController)

AdminLoginRoute.get("/dashboard", adminProtect, AdminDashboardController);


export default AdminLoginRoute;