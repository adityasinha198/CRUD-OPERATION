const userModel = require('../models/userSchema')
const {infoLogger, erroLogger} = require('../utils/logger')
const { genSalt, hashPassword, decryptPassword} = require('../middlewares/bcrypt')
const {signJwt} = require('../authentication/jwt')

const userHome = async (req,res) => {

  res.status(200).json({
    message : "Success"
  })
}

const signUp = async (req, res) =>{
try{
  let condition = {
    $or:[]
  }
  
  if(req.body.email) condition.$or.push({email: req.body.email})
  if(req.body.username) condition.$or.push({username : req.body.username})
  if(req.body.phoneNumber) condition.$or.push({phoneNumber:req.body.phoneNumber, countryCode:req.body.countryCode})

  const userExists = await userModel.findOne(condition)
  if(userExists){
    if(userExists.email === req.body.email){
      console.log("Inside this", userExists.email)
      return res.status(409).json({
        message: "Email is already linked with another account"
      })
    }else if(userExists.username === req.body.username){
      return res.status(409).json({
        message: "Username is already linked with another account"
      })
    }else if(userExists.phoneNumber === req.body.phoneNumber){
      return res.status(409).json({
        message: "Phone number is already linked with another account"
      })
    }
  }


  const userData = new userModel()
  userData.username = req.body.username
  userData.countryCode = req.body.countryCode
  userData.phoneNumber = req.body.phoneNumber
  userData.firstName = req.body.firstName
  userData.lastName = req.body.lastName
  userData.email = req.body.email

  if(req.body.password){
    const salt = await genSalt()
    const hash= await hashPassword(req.body.password, salt)
    userData.password = hash
  }

  await userData.save()
  return res.status(200).json({
    message: "Success"
  })
}catch(err){
  return res.status(500).json({
    message : err
  })
}
}

const login = async (req, res) =>{
  try{
    const password = req.body.password
    const userData = await userModel.findOne({email: req.body.email})
    if(!userData){
      return res.status(204).json({
        message: "Invalid credentials"
      })
    }
 
    const isPassword = await decryptPassword(userData.password, password)
    if(!isPassword){
      return res.status(401).json({
        message:"Invalid credentials"
      })
    }
   
  const token = await signJwt(userData._id.toString())
  return res.status(200).json({
    message:"Success",
    data:userData,
    token:token
  })
}catch(err){
  return res.status(500).json({
    message:err.message
  })
}
}

module.exports = {
  userHome,
  signUp,
  login
}
