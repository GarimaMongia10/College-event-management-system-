const express = require("express");
const Report = require("../models/report");
const { auth, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, authorizeRole("Admin"), async (req, res) => {
  const report = new Report({ ...req.body, generatedBy: req.user.id });
  await report.save();
  res.json(report);
});

router.get("/", auth, authorizeRole("Admin"), async (req, res) => {
  const reports = await Report.find().populate("eventId");
  res.json(reports);
});

module.exports = router;