const express = require('express');
const enquiryController = require('../controllers/EnquiryController');
const validate = require('../middlewares/validate');
const { EnquiryValidationSchema } = require('../validations/EnquiryValidation');
const router = express.Router();

router.get('/', enquiryController.getEnquiries);
router.post('/', validate(EnquiryValidationSchema), enquiryController.submitEnquiry);

module.exports = router;
