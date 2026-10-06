const Enquiry = require('../models/Enquiry');

const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitEnquiry = async (req, res) => {
  try {
    const data = req.body;
    
    if (!data.name || !data.regNumber || !data.contact || !data.email || !data.department || !data.batch || !data.interests) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const newEnquiry = new Enquiry(data);
    await newEnquiry.save();

    res.status(201).json({ message: 'Enquiry submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEnquiries,
  submitEnquiry
};
