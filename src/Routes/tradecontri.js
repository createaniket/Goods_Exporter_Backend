const express = require("express");
const router = express.Router();
const {createTrade, bulkUploadTrades, GetAll, GetAllOfTheSingleUser} = require("../Controller/Tradecrntrlr");
const Auth = require("../Middlewares/Auth");

const {upload_Excel} = require("../Middlewares/Multer");

router.post("/add", Auth, createTrade);
router.post("/upload", Auth, upload_Excel.single("file"), bulkUploadTrades);
router.get('/getall', GetAll )
router.get('/get/user/:id', GetAllOfTheSingleUser )


module.exports = router;