const {verifyJwt} = require('./jwt')

exports.authenticate = async (req,res,next) => {
try{
  const token = req.headers.authorization.split(' ')[1]
  const decode = await verifyJwt(token)
  req.userId = decode.userId
  next()
}catch(err){
  return res.status(401).json({
    message:"Unauthorized"
  })
}
}