const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  image: String, // Base64 encoded image or URL
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);