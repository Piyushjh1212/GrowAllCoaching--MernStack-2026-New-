// Modals/SecurityLogModal.js
import mongoose from "mongoose";

const securitySuspiousSchema = new mongoose.Schema({
    endpoint:
    {
        type: String,
        required: true    // API route, e.g., /login, /profile
    },     

    method:
    {
        type: String,
        required: true    // HTTP method, e.g., GET, POST
    },           

    ip:
    {
        type: String,
        required: true   // IP address of the request
    },          
         
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSignup",
        default: null    // optional if user logged in
    },                  

    type:
    {
        type: String,
        required: true    // e.g., "unauthorized", "rate-limit", "sanitize-block"
    },            

    message:
    {
        type: String     // optional detail

    },   

    timestamp:
    {
        type: Date,
        default: Date.now    // request time
    }       

});

export default mongoose.model("SecuritySuspiousLog", securitySuspiousSchema);