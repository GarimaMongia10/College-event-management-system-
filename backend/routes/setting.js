const express = require("express");
const router = express.Router();
const Setting = require("../models/setting");
const { authMiddleware } = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

// GET current settings
router.get("/", authMiddleware, async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting({
        theme: "light",
        notificationPreferences: "email",
        maxSeats: 100,
        enableRegistration: true
      });
      await settings.save();
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SAVE settings (Admin only)
router.post("/", authMiddleware, authorizeRole("admin"), async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting();
    }

    settings.theme = req.body.theme || settings.theme;
    settings.notificationPreferences =
      req.body.notificationPreferences || settings.notificationPreferences;
    settings.maxSeats =
      req.body.maxSeats || settings.maxSeats;
    settings.enableRegistration =
      req.body.enableRegistration !== undefined
        ? req.body.enableRegistration
        : settings.enableRegistration;

    await settings.save();

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
