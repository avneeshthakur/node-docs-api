const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  name: {
    type: String
  },
  url: {
    type: String
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
 },
 {
  timestamps: true
});

const Docs = mongoose.model('Docs', docSchema);

module.exports = Docs;