const multer = require('multer');
const Docs = require('../models/docModel');
const { pdfFileFilter, storage } = require('../middlewares/file-upload');
//upload doc
const uploadDoc = async (req, res, next) => {
    var upload = multer({
      fileFilter: pdfFileFilter,
      storage: storage
    }).single('doc');
   upload(req, res, async (err) => {
  	 if(err) {
  	 	 return res.status(500).json({
          status: false,
          message: err.message
        });
  	 	} else {
	 	    let newDoc = new Docs({
		   	  name:req.file.originalname,
		   	  url:req.file.filename
		   });
		   newDoc = await newDoc.save();
		   return res.status(200).json({status:true, message:"Doc saved", doc:newDoc});
  	 	}
  });
};

// get docs
const getDocs = async (req, res, next) => {

};

// download docs
const downloadDoc = async (req, res, next) => {

};

// delete docs
const deleteDoc = async (req, res, next) => {

};

module.exports = {
	uploadDoc,
	getDocs,
	downloadDoc,
	deleteDoc
}