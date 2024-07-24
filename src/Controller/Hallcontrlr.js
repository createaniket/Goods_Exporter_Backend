const Hall = require('../Models/Halls');
const Stall = require('../Models/Stalls');



// Helper function to generate stall numbers
const generateStallNumbers = (initialNumber, totalStalls) => {
    const stalls = [];
    const [prefix, start] = initialNumber.match(/([a-zA-Z\-]+)(\d+)/).slice(1, 3);
    for (let i = 0; i < totalStalls; i++) {
        stalls.push({
            stallNumber: `${prefix}${parseInt(start, 10) + i}`,
            status: 'available',
            hall: null
        });
    }
    return stalls;
};



exports.createHall = async (req, res) => {
    try {
        const { name, totalStalls, initialStallNumber, eventId } = req.body;

        // Get the file path from the request
        const layoutFile = req.file ? req.file.path : ''; // Save the file path in the database

        // Generate stalls data based on initial stall number and total stalls
        const stallsData = generateStallNumbers(initialStallNumber, totalStalls);

        // Create the hall with event reference
        const hall = new Hall({ name, layoutFile, totalStalls, event: eventId });
        await hall.save();

        // Create stalls for the hall and update their hall reference
        const stalls = await Stall.insertMany(stallsData.map(stall => ({ ...stall, hall: hall._id })));
        
        // Update the hall with the created stalls
        hall.stalls = stalls.map(stall => stall._id);
        await hall.save();

        res.status(201).json({hall:hall});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};