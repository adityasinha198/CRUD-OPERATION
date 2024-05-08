const userSchema = require('./userSchema')

exports.signUpValidate = async (req,res,next) =>{

  const value = await userSchema.signUpSchema.validate(req.body, { abortEarly: false })
  if (value.error) {
    return res.status(412).json({
      success:'failure',
        error: value.error.details[0].message
    })
   
}
else {
    next()
}
}

exports.loginValidate = async (req,res,next) =>{

  const value = await userSchema.loginSchema.validate(req.body, { abortEarly: false })
  if (value.error) {
    return res.status(412).json({
      success:'failure',
        error: value.error.details[0].message
    })
   
}
else {
    next()
}
}