import Contact from "../Modals/ContactModal.js";
import sanitize from "sanitize-html";
import { logSecurityEventHelper } from "../Helpers/SuspiouslogHelper.js";

export const createContact = async (req, res) => {
    try {

        let { name, email, message } = req.body;

        // Sanitize inputs
        name = sanitize(name?.trim() || "");
        email = sanitize(email?.trim() || "");
        message = sanitize(message?.trim() || "");

        // 1️⃣ Name validation
        if (!name) {

            await logSecurityEventHelper({
                endpoint: req.originalUrl,
                method: req.method,
                ip: req.ip,
                type: "CONTACT_NAME_MISSING",
                message: "Contact form submitted without name"
            });

            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        // 2️⃣ Email validation
        if (!email) {

            await logSecurityEventHelper({
                endpoint: req.originalUrl,
                method: req.method,
                ip: req.ip,
                type: "CONTACT_EMAIL_MISSING",
                message: "Contact form submitted without email"
            });

            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const emailregex = /\S+@\S+\.\S+/;

        if (!emailregex.test(email)) {

            await logSecurityEventHelper({
                endpoint: req.originalUrl,
                method: req.method,
                ip: req.ip,
                type: "CONTACT_INVALID_EMAIL",
                message: `Invalid email format: ${email}`
            });

            return res.status(400).json({
                success: false,
                message: "Email is invalid"
            });
        }

        // 3️⃣ Message validation
        if (!message) {

            await logSecurityEventHelper({
                endpoint: req.originalUrl,
                method: req.method,
                ip: req.ip,
                type: "CONTACT_MESSAGE_MISSING",
                message: "Contact message missing"
            });

            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // minimum 10 words
        if (message.split(/\s+/).length < 10) {

            await logSecurityEventHelper({
                endpoint: req.originalUrl,
                method: req.method,
                ip: req.ip,
                type: "CONTACT_SHORT_MESSAGE",
                message: "Contact message too short"
            });

            return res.status(400).json({
                success: false,
                message: "Message must be at least 10 words"
            });
        }

        // 4️⃣ Save message
        const ContactMesage = new Contact({ name, email, message });
        await ContactMesage.save();

        // 📊 Log contact submission
        await logSecurityEventHelper({
            endpoint: req.originalUrl,
            method: req.method,
            ip: req.ip,
            type: "CONTACT_MESSAGE_CREATED",
            message: `New contact message from ${email}`
        });

        res.status(201).json({
            success: true,
            message: "Message saved successfully",
            data: ContactMesage
        });

    } catch (error) {

        await logSecurityEventHelper({
            endpoint: req.originalUrl,
            method: req.method,
            ip: req.ip,
            type: "CONTACT_CREATE_ERROR",
            message: error.message
        });

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: Object.values(error.errors).map(val => val.message)
            });
        }

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// 📩 Get All Messages (Admin Access)
export const GetcreateContact = async (req, res) => {
    try {

        const messages = await Contact.find().sort({ createdAt: -1 });

        // 📊 Log admin viewing messages
        await logSecurityEventHelper({
            endpoint: req.originalUrl,
            method: req.method,
            ip: req.ip,
            userId: req.user?._id,
            type: "CONTACT_MESSAGES_VIEWED",
            message: "Admin viewed contact messages"
        });

        res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


// 📊 Get Message Count
export const GetMessageCount = async (req, res) => {
    try {

        const count = await Contact.countDocuments();

        // 📊 Log count request
        await logSecurityEventHelper({
            endpoint: req.originalUrl,
            method: req.method,
            ip: req.ip,
            userId: req.user?._id,
            type: "CONTACT_MESSAGE_COUNT_REQUEST",
            message: "Contact message count requested"
        });

        res.status(200).json({ success: true, count });

    } catch (error) {

        console.error(error);

        res.status(500).json({ success: false, message: "Server Error" });
    }
};