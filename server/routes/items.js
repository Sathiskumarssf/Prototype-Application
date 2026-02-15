const express = require("express");
const Item = require("../models/Item");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const item = await Item.create({ title, price, image });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Delete file if exists
    if (item.image) {
      const filePath = path.join(__dirname, "..", item.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, price } = req.body;
    const updateData = { title, price };

    if (req.file) {
      // Delete old image if exists
      const item = await Item.findById(req.params.id);
      if (item.image) {
        const oldImagePath = path.join(__dirname, "..", item.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
