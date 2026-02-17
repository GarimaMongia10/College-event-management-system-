const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");
const { authMiddleware } = require("../middleware/auth");

// GET dashboard statistics (Admin only)
router.get("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalEvents,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
