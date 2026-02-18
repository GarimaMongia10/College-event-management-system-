const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  totalEvents: {
    type: Number,
    required: true
  },
  totalUsers: {
    type: Number,
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
