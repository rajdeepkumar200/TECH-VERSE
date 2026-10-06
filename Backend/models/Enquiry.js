const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNumber: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  batch: { type: String, required: true },
  interests: { type: [String], required: true },
  otherInterest: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
