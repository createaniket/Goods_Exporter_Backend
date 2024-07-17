const express = require("express");
const router = express.Router();
const tradeController = require("../Controller/Tradecrntrlr");
const Auth = require("../Middlewares/Auth");

const {uploadExcel} = require("../Middlewares/Multer");

router.post("/trades", Auth, tradeController.createTrade);


router.post("/trades/upload", Auth, uploadExcel.single("file"), tradeController.bulkUploadTrades);

module.exports = router;