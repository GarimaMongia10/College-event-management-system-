const express = require("express");
const router = express.Router();
const Report = require("../models/report");
const { authMiddleware } = require("../middleware/auth");

router.post("/", authMiddleware(["admin", "Admin"]), async (req, res) => {
  try {
    const report = new Report({ ...req.body, generatedBy: req.user.id });
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", authMiddleware(["admin", "Admin"]), async (req, res) => {
  try {
    const reports = await Report.find().populate("eventId");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;