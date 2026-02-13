const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { authMiddleware } = require("../middleware/auth");

// Only admin can add events (allowing "admin" or "Admin" roles)
router.post("/", authMiddleware(["admin", "Admin"]), async (req, res) => {
  try {
    const event = new Event({ ...req.body, createdBy: req.user.id });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET events - authenticated users only
const { auth } = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email').populate('participants', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register current user for an event
router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const userId = req.user.id;
    if (!event.participants) event.participants = [];
    if (event.participants.find(p => p.toString() === userId)) {
      return res.status(400).json({ error: 'Already registered' });
    }
    event.participants.push(userId);
    await event.save();
    res.json({ message: 'Registered', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unregister
router.post('/:id/unregister', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    const userId = req.user.id;
    event.participants = event.participants.filter(p => p.toString() !== userId);
    await event.save();
    res.json({ message: 'Unregistered', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event (admin only)
router.put("/:id", authMiddleware(["admin", "Admin"]), async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete event (admin only)
router.delete("/:id", authMiddleware(["admin", "Admin"]), async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;