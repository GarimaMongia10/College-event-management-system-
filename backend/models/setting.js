const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  theme: {
    type: String,
    default: "light"
  },
  notificationPreferences: {
    type: String,
    default: "email"
  },
  maxSeats: {
    type: Number,
    default: 100   // maximum seats allowed per event
  },
  enableRegistration: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Setting", settingSchema);
