const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoutes = require('./routes/index')
const {infoLogger, erroLogger} = require('./utils/logger')

require('dotenv').config()
require('./library/mongodb')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/v1',userRoutes)
app.listen(process.env.PORT,() => {
  infoLogger.info(`Server is running on port ${process.env.PORT}`)
})
