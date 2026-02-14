import Contact from "../Modals/ContactModal.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1️⃣ Manual validation (optional but good)
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2️⃣ Create and save the contact message
        const ContactMesage = new Contact({ name, email, message });
        await ContactMesage.save();

        // 3️⃣ Send success response
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