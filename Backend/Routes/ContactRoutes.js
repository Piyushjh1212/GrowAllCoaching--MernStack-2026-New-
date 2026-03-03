import express from 'express';
import { createContact, GetcreateContact, GetMessageCount } from '../Controllers/ContactController.js';
import {ContactLimiter} from "../Middleware/Contactratelimitermiddlewear.js"

const Contactroutes = express.Router();

Contactroutes.post('/Contact', ContactLimiter, createContact);
Contactroutes.get("/get-Contact", GetcreateContact)
Contactroutes.get("/messages-count", GetMessageCount)


export default Contactroutes;