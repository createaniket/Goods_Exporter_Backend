const Multer = require("multer");
const Path = require("path");




// Set up storage configuration for multer
const Storage1 = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public/Excels'); // Store files in the 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, 'excels' + file.fieldname + '-' + uniqueSuffix + Path.extname(file.originalname));
    cb(null, `excels-${req.user._id}-${file.fieldname}-${uniqueSuffix}${Path.extname(file.originalname)}`);
  }
});


const Storage2 = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public/Avatars');
  },
  filename: function (req, file, cb) {
      cb(null, 'userprofile'+ req.user._id + '-' + Date.now() + Path.extname(file.originalname))
      // cb(null, Date.now() + '-' + file.originalname);
  },
});



module.exports = {
  upload_Excel: Multer({ storage: Storage1 }),
  upload_User_Avatar: Multer({ storage: Storage2 }),




};