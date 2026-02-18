const express = require("express");
const router = express.Router();

const Event = require("../models/event");
const User = require("../models/user");
const Report = require("../models/report");
const { authMiddleware } = require("../middleware/auth");

// GET /api/report/summary
router.get("/summary", authMiddleware(), async (req, res) => {
  try {
    // Count real data
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();

    // Save to MongoDB
    const newReport = new Report({
      totalEvents,
      totalUsers
    });

    await newReport.save();

    // Send response to frontend
    res.json({
      totalEvents,
      totalUsers
    });

  } catch (err) {
    console.error("Report Error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
