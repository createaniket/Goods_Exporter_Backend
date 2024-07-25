const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
    stallNumber: { type: String, required: true},
    status: { type: String, enum: ['available', 'reserved', 'confirmed'], default: 'available' },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true }
}, { timestamps: true }); // Enable timestamps

const Stall = mongoose.model('Stall', stallSchema);

module.exports = Stall;
