const joi = require('joi')

const signUpSchema = joi.object({
  firstName : joi.string().optional().default(''),
  lastName: joi.string().optional().default(''),
  username:joi.string().required(),
  email:joi.string().required(),
  password:joi.string().required(),
  phoneNumber:joi.number(),
  countryCode:joi.string()
}).required()

const loginSchema = joi.object({
  email : joi.string().required(),
  password: joi.string().required()
})

module.exports = {
  signUpSchema,
  loginSchema
}

