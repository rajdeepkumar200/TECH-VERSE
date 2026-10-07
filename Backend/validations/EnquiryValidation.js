const Joi = require('joi');

const EnquiryValidationSchema = Joi.object({
  name: Joi.string().required(),
  regNumber: Joi.string().required(),
  contact: Joi.string().required(),
  email: Joi.string().email().required(),
  department: Joi.string().required(),
  batch: Joi.string().required(),
  residenceType: Joi.string().allow('', null).optional(),
  photo: Joi.string().allow('', null).optional(),
  interests: Joi.array().items(Joi.string()).min(1).required(),
  otherInterest: Joi.string().allow('', null).optional(),
  designation: Joi.string().allow('', null).optional(),
  roleAssignee: Joi.string().allow('', null).optional(),
  memberId: Joi.string().allow('', null).optional(),
  clubConsent: Joi.boolean().optional(),
  consentGiven: Joi.boolean().optional(),
  consentTimestamp: Joi.any().optional(),
}).unknown(true);

module.exports = {
  EnquiryValidationSchema
};
