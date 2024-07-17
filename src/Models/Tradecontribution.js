const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    date: { type: Date, required: true },
    exportAmount: { type: Number, required: true },
    description: { type: String },
    invoiceNumber: { type: String, required: true, unique: true },
    approved: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
