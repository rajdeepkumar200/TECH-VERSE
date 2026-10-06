const Contact = require('../models/Contact');
const { Parser } = require('json2csv');

const submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Form submitted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContactsCSV = async (req, res) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.query.key;
    if (apiKey !== process.env.Contact_form_key) {
      return res.status(403).json({ message: 'Unauthorized: Invalid API Key' });
    }
    const data = await Contact.find().lean();
    const parser = new Parser();
    const csv = parser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('contact.csv');
    res.send(csv);
  } catch (err) {
    console.error("Error generating CSV:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  submitContact,
  getContactsCSV
};
