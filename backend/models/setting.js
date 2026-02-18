const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  registrationEnabled: {
    type: Boolean,
    default: true
  },
  maxUsersPerEvent: {
    type: Number,
    default: 50
  }
});

module.exports = mongoose.model("Setting", settingSchema);
