const express = require("express");
const Setting = require("../models/setting");
const { auth, authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.put("/", authMiddleware(["admin", "Admin"]), async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(setting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const setting = await Setting.findOne();
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;