const express = require('express');
const clubMemberController = require('../controllers/ClubMemberController');
const validate = require('../middlewares/validate');
const { EnquiryValidationSchema } = require('../validations/EnquiryValidation');
const router = express.Router();

router.get('/', clubMemberController.getScreeningMembers);
router.post('/', validate(EnquiryValidationSchema), clubMemberController.submitClubMember);
router.patch('/:id/role', clubMemberController.updateMemberRole);
router.put('/:id/role', clubMemberController.updateMemberRole);
router.delete('/:id', clubMemberController.deleteScreeningMember);

module.exports = router;
