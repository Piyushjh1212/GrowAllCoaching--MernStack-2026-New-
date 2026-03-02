import Contact from "../Modals/ContactModal.js";
import sanitize from "sanitize-html";

export const createContact = async (req, res) => {
    try {
        let { name, email, message } = req.body;

        // Sanitize inputs to prevent XSS
        name = sanitize(name?.trim() || "");
        email = sanitize(email?.trim() || "");
        message = sanitize(message?.trim() || "");

        //1  Validation
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        };

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        };

        const emailregex = /\S+@\S+\.\S+/;
        if (!emailregex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email is invalid"
            });
        }

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        // must be 10 words
        if (message.split(/\s+/).length < 10) {
            return res.status(400).json({
                success: false,
                message: "Message must be at least 10 words"
            });
        }

        // 2️ Create and save the contact message
        const ContactMesage = new Contact({ name, email, message });
        await ContactMesage.save();


        // 3️ Send success response
        res.status(201).json({
            success: true,
            message: "Message saved successfully",
            data: ContactMesage
        });


    } catch (error) {
        // 4️⃣ Error handling
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


export const GetcreateContact = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 }); // latest first
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
}

export const GetMessageCount = async (req, res) => {
    try {
        const count = await Contact.countDocuments(); // total messages
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

