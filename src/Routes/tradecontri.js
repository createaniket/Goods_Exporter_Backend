const express = require("express");
const router = express.Router();
const tradeController = require("../Controller/Tradecrntrlr");
const Auth = require("../Middlewares/Auth");

const {uploadExcel} = require("../Middlewares/Multer");

router.post("/add", Auth, tradeController.createTrade);


router.post("/upload", Auth, uploadExcel.single("file"), tradeController.bulkUploadTrades);

module.exports = router;