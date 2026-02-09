const express = require("express");
const Event = require("../models/Event");
const { auth, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, authorizeRole("Admin"), async (req, res) => {
  const event = new Event({ ...req.body, createdBy: req.user.id });
  await event.save();
  res.json(event);
});

router.get("/", auth, async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.put("/:id", auth, authorizeRole("Admin"), async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

router.delete("/:id", auth, authorizeRole("Admin"), async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

module.exports = router;