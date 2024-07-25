const express = require("express");
const router = express.Router();

const {createHall, GetAllHalls} = require('../Controller/Hallcontrlr')

const {upload_Layout} = require('../Middlewares/Multer')


router.post('/add', upload_Layout.single('layout'), createHall)
router.get('/getall', GetAllHalls)


module.exports = router;