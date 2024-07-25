const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    layoutFile: { type: String, required: true }, // URL or path to the PDF/JPG file
    totalStalls: { type: Number, required: true },
    stalls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stall" }],
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // Reference to Event
  },
  { timestamps: true }
); // Enable timestamps

const Hall = mongoose.model("Hall", hallSchema);

module.exports = Hall;
