const Joi = require('joi');

const EnquiryValidationSchema = Joi.object({
  name: Joi.string().required(),
  regNumber: Joi.string().required(),
  contact: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  department: Joi.string().required(),
  batch: Joi.string().required(),
  interests: Joi.array().items(Joi.string()).min(1).required(),
  otherInterest: Joi.string().allow('', null).optional()
});

module.exports = {
  EnquiryValidationSchema
};
