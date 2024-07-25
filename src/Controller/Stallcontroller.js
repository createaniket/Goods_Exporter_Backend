const Stall = require('../Models/Stalls');

exports.getStalls = async (req, res) => {
    try {
        const stalls = await Stall.find();
        res.status(200).json(stalls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.bookStall = async (req, res) => {
    try {
        const { stallNumber } = req.body;
        const userId = req.user._id
        const stall = await Stall.findOne({ stallNumber });

        if (!stall) {
            return res.status(404).json({ error: 'Stall not found' });
        }

        if (stall.status !== 'available') {
            return res.status(400).json({ error: 'Stall not available' });
        }

        stall.status = 'reserved';
        stall.bookedBy = userId;

        await stall.save();

        res.status(200).json({ success: true, message: 'Stall booked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Initialize stalls
exports.initializeStalls = async (req, res) => {
    const stallsData = req.body.stalls; // Expecting an array of stall objects

    try {
        await Stall.deleteMany(); // Clear existing stalls

        const stalls = await Stall.insertMany(stallsData);

        res.status(201).json(stalls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getStallsByHallId = async (req, res) => {
    try {
        const ID = req.params.id;
        console.log("hjebvcjkerbver", ID)
        const stall = await Stall.find({hall:ID});
        if (!stall) {
            return res.status(404).json({ error: "Stall not found" });
        }
        res.status(200).json(stall);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
