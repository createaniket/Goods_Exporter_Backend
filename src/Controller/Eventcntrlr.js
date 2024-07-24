const Event = require('../Models/Events');

// Create a new event
exports.createEvent = async (req, res) => {
    console.log("ekjbcbelkv", req.body)

    let eventImages = [];
    if (req.files && req.files.length) {
      eventImages = req.files.map(image => image.path);
    }
  
    const {
      name,
      date,
      type,
      description,
      guidelines,
      floorPlanUrl,
      status,
      registrationDeadline,
      delegates,
      exhibitors,
      visitors
    } = req.body;
  
    const newEvent = new Event({
      name,
      date,
      type,
      description,
      guidelines,
      floorPlanUrl,
      status,
      registrationDeadline,
      delegates,
      exhibitors,
      visitors,
      images: eventImages // Add uploaded images
    });
  
    try {
      const data = await newEvent.save();
      res.status(201).json({
        event: data
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
        error: error
      });
    }
  };


// Upload images for an event
exports.uploadEventImages = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        try {
            const event = await Event.findById(req.body.eventId);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            req.files.forEach(file => event.images.push(file.path));
            await event.save();
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({events:events});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({event:event});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
