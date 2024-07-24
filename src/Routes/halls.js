const express = require("express");
const router = express.Router();

const {createHall} = require('../Controller/Hallcontrlr')

const {upload_Layout} = require('../Middlewares/Multer')


router.post('/add', upload_Layout.single('layout'), createHall)


module.exports = router;