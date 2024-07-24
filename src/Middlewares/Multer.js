const Multer = require("multer");
const Path = require("path");

// Set up storage configuration for multer
const Storage1 = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Excels"); // Store files in the 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, 'excels' + file.fieldname + '-' + uniqueSuffix + Path.extname(file.originalname));
    cb(
      null,
      `excels-${req.user._id}-${file.fieldname}-${uniqueSuffix}${Path.extname(
        file.originalname
      )}`
    );
  },
});

const Storage2 = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/Avatars");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "userprofile" +
        req.user._id +
        "-" +
        Date.now() +
        Path.extname(file.originalname)
    );
    // cb(null, Date.now() + '-' + file.originalname);
  },
});

// Define the storage configuration
const Storage3 = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Layouts"); // The folder where files will be uploaded
  },
  filename: (req, file, cb) => {
    const eventId = req.body.eventId;
    if (!eventId) {
        return cb(new Error('Event ID is required'));
    }
    cb(null, `${eventId}_${Date.now()}${Path.extname(file.originalname)}`);
  },
});



// Define the storage configuration
const Storage4 = Multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Events'); // The folder where files will be uploaded
  },
  filename: (req, file, cb) => {
   
      // Use the eventId in the filename
      cb(
        null,
        "Event" +
        '-' +
        Date.now() +
          Path.extname(file.originalname)
      );
  }
});



module.exports = {
  upload_Excel: Multer({ storage: Storage1 }),
  upload_User_Avatar: Multer({ storage: Storage2 }),
  upload_Layout: Multer({ storage: Storage3 }),
  upload_Event_Images: Multer({ storage: Storage4 }),

};
