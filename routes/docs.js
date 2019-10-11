var express = require('express');
var router = express.Router();
const { 
	uploadDoc,
	getDocs,
	downloadDoc,
	deleteDoc
} = require('../controllers/docs-controller');
const { authenticate } = require('../middlewares/ensure-auth');

/* upload doc. */
router.post('/upload', authenticate, uploadDoc);

/* get docs. */
router.get('/getDocs', authenticate, getDocs);

/* download docs. */
router.get('/download/:id', authenticate, downloadDoc);

/* delete docs. */
router.delete('/delete/:id', authenticate, deleteDoc);

module.exports = router;
