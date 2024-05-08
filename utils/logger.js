const {createLogger , transports , format} = require('winston')

const logFormat = format.combine(  
  format.timestamp({format :"DD-MM-YYYY hh:mm:ss"}),
  format.colorize(),
  format.simple(),
  format.align()
)

const infoLogger = createLogger({
  level : 'info',
  format : logFormat,
  transports :[
    new transports.Console()
  ]
})

const erroLogger = createLogger({
  level : 'error',
  format : logFormat,
  transports :[
    new transports.Console()
  ]
})

const debugLogger = createLogger({
  level : 'debug',
  format : logFormat,
  transports :[
    new transports.Console()
  ]
})

module.exports = {
  infoLogger,
  erroLogger,
  debugLogger
}
