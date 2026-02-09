const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  attendance: Number,
  feedback: String,
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Report", reportSchema);