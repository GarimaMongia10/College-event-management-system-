const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.get("/", (req, res) => res.send("College Event Management API Running"));

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");
const reportRoutes = require("./routes/report");
const settingRoutes = require("./routes/setting");

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/setting", settingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));