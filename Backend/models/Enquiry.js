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
  memberId: { type: String, default: "" },
  residenceType: { type: String, enum: ["Hosteller", "Day Scholar"], default: "Day Scholar" },
  photo: { type: String, default: "" },
  designation: { type: String, default: "" },
  roleAssignee: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
}, { strict: false });

module.exports = mongoose.model('Enquiry', EnquirySchema);
