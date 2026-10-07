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

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, message: 'Contact message deleted successfully', id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactsCSV,
  deleteContact,
};
