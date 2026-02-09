const express = require("express");
const Setting = require("../models/setting");
const { auth, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.put("/", auth, authorizeRole("Admin"), async (req, res) => {
  const setting = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(setting);
});

router.get("/", auth, async (req, res) => {
  const setting = await Setting.findOne();
  res.json(setting);
});

module.exports = router;