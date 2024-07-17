const Multer = require("multer");
// const Path = require("path");




const storage = Multer.memoryStorage(); // Configure Multer to use memory storage
const uploadExcel = Multer({ storage });



module.exports = {
  uploadExcel: uploadExcel,
};

