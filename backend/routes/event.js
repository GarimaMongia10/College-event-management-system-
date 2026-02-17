const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { authMiddleware } = require("../middleware/auth");


// =======================
// CREATE EVENT
// Admin + Faculty
// =======================
router.post(
  "/",
  authMiddleware(["admin", "faculty"]),
  async (req, res) => {
    try {
      const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        image: req.body.image,
        createdBy: req.user.id,
      });

      await event.save();

      res.status(201).json(event);
    } catch (err) {
      console.error("Create Event Error:", err);
      res.status(500).json({ message: err.message });
    }
  }
);


// =======================
// GET ALL EVENTS
// Any logged user
// =======================
router.get(
  "/",
  authMiddleware(),   // no role restriction
  async (req, res) => {
    try {
      const events = await Event.find().sort({ date: 1 });

      console.log("Events fetched:", events.length);

      res.status(200).json(events);
    } catch (err) {
      console.error("Fetch Events Error:", err);
      res.status(500).json({ message: err.message });
    }
  }
);


module.exports = router;
