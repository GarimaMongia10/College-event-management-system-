const express = require("express");
const router = express.Router();
const Setting = require("../models/setting");
const { authMiddleware } = require("../middleware/auth");

// GET current settings
router.get("/", authMiddleware(), async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting();
      await settings.save();
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE settings
router.put("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting();
    }

    settings.registrationEnabled = req.body.registrationEnabled;
    settings.maxUsersPerEvent = req.body.maxUsersPerEvent;

    await settings.save();

    res.json({ message: "Settings saved", settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
