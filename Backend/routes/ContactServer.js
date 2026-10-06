const express = require('express');
const contactController = require('../controllers/ContactController');
const validate = require('../middlewares/validate');
const { ContactValidationSchema } = require('../validations/ContactValidation');
const router = express.Router();

router.post('/', validate(ContactValidationSchema), contactController.submitContact);
router.get('/csv', contactController.getContactsCSV);

module.exports = router;

