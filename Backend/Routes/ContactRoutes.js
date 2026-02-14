import express from 'express';
import { createContact } from '../Controllers/ContactController.js';

const Contactroutes = express.Router();

Contactroutes.post('/Contact', createContact);


export default Contactroutes;