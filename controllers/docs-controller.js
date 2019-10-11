const multer = require("multer");
const Docs = require("../models/docModel");
const path = require("path");
const fs = require('fs');
const { pdfFileFilter, storage } = require("../middlewares/file-upload");


//upload doc
const uploadDoc = async (req, res, next) => {
  var upload = multer({
    fileFilter: pdfFileFilter,
    storage: storage
  }).single("doc");
  upload(req, res, async err => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err.message
      });
    } else {
      let newDoc = new Docs({
				name: req.file.filename,
  			author:req.user._id,				
        url: req.file.path
      });
      newDoc = await newDoc.save();
      return res
        .status(200)
        .json({ status: true, message: "Doc saved", doc: newDoc });
    }
  });
};

// get docs
const getDocs = async (req, res, next) => {
  try {
    let docs = await Docs.find();
    return res.status(200).json({ status: true, message: "All Docs", docs });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// download docs
const downloadDoc = async (req, res, next) => {
  try {
    let id = req.params.id;
    let doc = await Docs.findById({ _id: id });
    if (doc) {
			const file = fs.createReadStream(doc.url);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', `attachment; filename=${doc.name}`);
			file.pipe(res);
    } else {
      return res.status(200).json({ status: false, message: "Doc Not Found." });
    }
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// delete docs
const deleteDoc = async (req, res, next) => {
  try {
    let id = req.params.id;
		let doc = await Docs.findOneAndDelete({ _id: id , author: req.user._id});
		if(doc) {
			let id = req.user._id;
			let name = doc.name;
			let dir = path.resolve(`public/uploads/${id}/${name}`);
			fs.unlink(path.resolve(dir), (err) => {
				 if(err) {
					return res.status(500).json({ status: false, message: err.message });
				 }
			});
			return res.status(200).json({ status: true, message: "Doc Deleted.", doc });
		} else {
			return res.status(200).json({ status: false, message: "Doc Not Found." });
		}
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = {
  uploadDoc,
  getDocs,
  downloadDoc,
  deleteDoc
};
