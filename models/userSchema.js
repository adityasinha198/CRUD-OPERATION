const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName :{
    type : String,
    default:''
  },
  lastName:{
    type: String,
    default: ''
  },
  username:{
    type : String,
    require : true
  },
  email:{
    type: String,
    require: true
  },
  phoneNumber:{
    type : Number,
    unique : true
  },
  countryCode:{
    type: String
  },
  password:{
    type: String,
    require: true
  }
},{timestamps: true})

module.exports = mongoose.model('user',userSchema)