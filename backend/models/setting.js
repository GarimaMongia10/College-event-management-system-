const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  theme: { type: String, default: "light" },
  notificationPreferences: { type: String, default: "email" },
  systemConfig: Object
});

module.exports = mongoose.model("Setting", settingSchema);