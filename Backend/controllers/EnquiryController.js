const Enquiry = require('../models/Enquiry');
const UnderScreeningMember = require('../models/UnderScreeningMember');

const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitEnquiry = async (req, res) => {
  try {
    const data = req.body;
    
    if (!data.name || !data.regNumber || !data.contact || !data.email || !data.department || !data.batch) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Default designation and roleAssignee to empty strings so admin can fill in MongoDB
    if (!data.designation) {
      data.designation = '';
    }

    if (!data.roleAssignee) {
      data.roleAssignee = '';
    }

    if (!data.residenceType) {
      data.residenceType = 'Day Scholar';
    }

    if (!data.photo) {
      data.photo = '';
    }

    if (!data.memberId) {
      data.memberId = `TV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    }

    const newEnquiry = new Enquiry(data);
    await newEnquiry.save();

    // Also persist directly into UnderScreeningMember collection in MongoDB
    try {
      const newScreeningMember = new UnderScreeningMember(data);
      await newScreeningMember.save();
    } catch (cmErr) {
      console.warn('UnderScreeningMember collection sync note:', cmErr.message);
    }

    res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry: newEnquiry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, message: 'Enquiry deleted successfully', id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getEnquiries,
  submitEnquiry,
  deleteEnquiry,
};
