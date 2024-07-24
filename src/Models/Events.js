const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    description: String,
    guidelines: String,
    floorPlanUrl: String,
    // IECCheckUrl: String,
    status: { type: String, default: 'open' },
    registrationDeadline: Date,
    delegates: [{
        type: { type: String },
        name: String,
        organization: String,
    }],
    exhibitors: [{
        name: String,
        booth: String,
    }],
    visitors: [{
        name: String,
        email: String,
        badgeId: String,
    }],
    images: [String] // Array to store image paths or URLs
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
