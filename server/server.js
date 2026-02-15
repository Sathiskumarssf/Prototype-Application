const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
console.log("MONGO_URI:", process.env.MONGO_URI);

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ======================
   DATABASE
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ======================
   API ROUTES
====================== */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));

/* ======================
   SERVE REACT (EXPRESS 5 SAFE)
====================== */
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  // Only serve frontend if it exists
  const fs = require("fs");
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.use((req, res) => {
      res.sendFile(path.resolve(buildPath, "index.html"));
    });
  } else {
    console.log("Frontend not built, skipping static serving");
  }
}

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
