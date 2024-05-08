const jwt = require('jsonwebtoken')
const {debugLogger, erroLogger} = require('../utils/logger')

exports.signJwt = (userId) => new Promise( async (resolve,reject) =>{
  try{
    debugLogger.debug("generating auth token")
    const authToken = await jwt.sign({userId : userId},process.env.JWT_KEY,{expiresIn : '24h'})
    return resolve(authToken)
    
  }catch(err){
    erroLogger.error("error in generating auth token",err)
    return reject(err)
  }
})

exports.verifyJwt = (token) => new Promise(async (resolve, reject)=>{
  try{
  const verify = await jwt.verify(token, process.env.JWT_KEY)
  return resolve(verify)
  }catch(err){
    return reject(err)
  }
})
