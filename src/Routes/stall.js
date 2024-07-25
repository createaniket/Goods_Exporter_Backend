const express = require("express");
const router = express.Router();

const {getStalls, bookStall, initializeStalls, getStallsByHallId} = require('../Controller/Stallcontroller');

const Auth = require('../Middlewares/Auth')
// Route to get all stalls
router.get('/', getStalls);
router.get('/getbyhall/:id', getStallsByHallId);


// Route to book a stall
router.post('/book',Auth, bookStall);

// Route to initialize stalls (for setup purposes)
router.post('/initialize', initializeStalls);

module.exports = router;