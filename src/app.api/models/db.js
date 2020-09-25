import mongoose from 'mongoose'

let dbURI = process.env.MONGOLAB_URI //"mongodb://biza:J16032309.@ds157946.mlab.com:57946/swordvoice"; //"mongodb://localhost/swordvoiceBlog"; //mongodb://username:password@localhost:27027/database

// if (process.env.NODE_ENV === "production") {
//   // dbURI = "mongodb://biza:J16032309.@ds157946.mlab.com:57946/swordvoice"; //process.env.MONGOLAB_URI;
//   dbURI = process.env.MONGOLAB_URI; //MONGOLAB_URI es una variable de ENV creada en la nube
// } //si esta en produccion se conecta a la db de la nube MLAB AWS

mongoose.connect(dbURI, {useNewUrlParser: true})
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI)
})
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected')
})

let gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg)
    callback()
  })
}
// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2')
    console.log('Nodemon restarts')
  })
})
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0)
  })
})

require('./siteSchema')
require('./visitorSchema')
require('./commentSchema')
require('./responseSchema')
require('./articleSchema')
require('./userSchema')
require('./siteSchema')
