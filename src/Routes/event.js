const express = require("express");
const router = express.Router();

const {createEvent, getAllEvents} = require('../Controller/Eventcntrlr')

const {upload_Event_Images} = require('../Middlewares/Multer')


router.post('/add', upload_Event_Images.array('images',10), createEvent)
router.get('/getall',getAllEvents)



module.exports = router;