const multer = require('multer');
const path = require('path');

const DESTINATION_PATH = "./public/upload";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DESTINATION_PATH);
  },
  filename: (req, file, cb) => {
    // event img.jpg => event-img-6464646465.jpg
    const fileExt = path.extname(file.originalname);
    const fileName = file.originalname
      .replace(fileExt, "")
      .toLocaleLowerCase()
      .split(" ")
      .join("-") + "-" + Date.now();
    cb(null, fileName + fileExt);
  }
})

const upload = multer({
  // dest: DESTINATION_PATH,
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "profileImg") {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }

    }
  }
});

module.exports = {
  upload,
  DESTINATION_PATH
}