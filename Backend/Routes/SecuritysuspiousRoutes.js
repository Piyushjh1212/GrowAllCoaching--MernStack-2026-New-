import express from "express";
import { protect } from "../Middleware/Userauthmiddlewear.js";
import SecuritySuspiousLog from "../Modals/SecuritysuspiousModals.js";

const SecuritysuspiousRoutes = express.Router();

// GET all security logs (protected route)
SecuritysuspiousRoutes.get("/Suspious/logs", async (req, res) => {

  try {
    // optional: admin check
    // if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const logs = await SecuritySuspiousLog.find().sort({ timestamp: -1 }).limit(100); // latest 100 logs
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

SecuritysuspiousRoutes.get('/totalsuspiouslogs-count', async (req, res) =>{
     try {
          const count = await SecuritySuspiousLog.countDocuments(); // total messages
          res.status(200).json({ success: true, count });
      } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Server Error" });
      }
})

export default SecuritysuspiousRoutes;