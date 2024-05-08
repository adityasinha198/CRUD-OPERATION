const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')

router.use('/user',userRoutes)
router.get("*",(req,res,next)=>{
  res.status(404).json({
    message : "Wrong url hit"
  })
})

module.exports =  router
