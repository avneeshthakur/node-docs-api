const multer = require('multer');

const storage =  multer.diskStorage({
   destination: (req, file, cb) => {
   	const user = req.user;
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname.replace(/\s+/g, ''));
    }
  });
const pdfFileFilter = (req, file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(pdf|PDF)$/)) {

    cb(new Error('Please send the valid File Type'));
  } else {

    cb(null, true);
  }
};

module.exports = {
	storage,
	pdfFileFilter
}