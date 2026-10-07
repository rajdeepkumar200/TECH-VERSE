const express = require('express');
const clubMemberController = require('../controllers/ClubMemberController');
const validate = require('../middlewares/validate');
const { EnquiryValidationSchema } = require('../validations/EnquiryValidation');
const router = express.Router();

router.get('/', clubMemberController.getClubMembers);
router.get('/screening', clubMemberController.getScreeningMembers);
router.post('/', validate(EnquiryValidationSchema), clubMemberController.submitClubMember);
router.patch('/:id/role', clubMemberController.updateMemberRole);
router.put('/:id/role', clubMemberController.updateMemberRole);
router.patch('/:id/promote', clubMemberController.promoteMember);
router.put('/:id/promote', clubMemberController.promoteMember);
router.patch('/:id/resign', clubMemberController.acceptResignation);
router.post('/:id/resign', clubMemberController.acceptResignation);
router.patch('/:id/terminate', clubMemberController.terminateMember);
router.post('/:id/terminate', clubMemberController.terminateMember);
router.put('/:id', clubMemberController.updateMemberRole);
router.patch('/:id', clubMemberController.updateMemberRole);
router.delete('/screening/:id', clubMemberController.deleteScreeningMember);
router.delete('/:id', clubMemberController.deleteClubMember);

module.exports = router;
