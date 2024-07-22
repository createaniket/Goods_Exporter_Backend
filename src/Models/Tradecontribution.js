const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exportAmount: { type: Number, required: true },
    description: { type: String },
    company:{type: String},
    consignee: { type: String },
    invoiceNumber: { type: String, required: true, unique: true },
    approved: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    consignee: { type: String },
    methodOfDispatch: { type: String },
    typeOfShipment: { type: String },
    vesselAircraft: { type: String },
    portOfLoading: { type: String },
    reference: { type: String },
    billOfLadingNumber: { type: String },
    invoiceDate: { type: Date },
    buyerReference: { type: String },
    countryOfOrigin: { type: String },
    countryOfFinalDestination: { type: String },
    terms: { type: String },
    methodOfPayment: { type: String },
  },
  { timestamps: true }
);

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
