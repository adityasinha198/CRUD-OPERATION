const mongoose = require('mongoose')
const { infoLogger , erroLogger} = require('../utils/logger')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL)
.then(()=> infoLogger.info("Connected to database successfully"))
.catch(err => erroLogger.error(err))