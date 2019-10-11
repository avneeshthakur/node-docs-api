const multer = require("multer");
const path = require("path");
const mkdirp = require('mkdirp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user = req.user;
    const folder = `/${user._id}`;
    const fullpath = path.resolve(`public/uploads/${folder}`);
    mkdirp.sync(fullpath);
    cb(null, fullpath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/\s+/g, "")
    );
  }
});
const pdfFileFilter = (req, file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {
    cb(new Error("Please send the valid File Type"));
  } else {
    cb(null, true);
  }
};

module.exports = {
  storage,
  pdfFileFilter
};
