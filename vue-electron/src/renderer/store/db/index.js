var mongoose = require('mongoose')
var config = require('@/config')

// var log         = require('./log')(module);

function connect () {
  console.log('connect()')
  /**
   * mongoose.connect(mongoUrl, function (err) {
   *   if (err) {
   *     console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
   *     setTimeout(connect, 5000)
   *   }
   * })
   * return mongoose.connection
   */

  /**
   * mongoose.connect(mongoUrl, { server: { reconnectTries: Number.MAX_VALUE } })
   * return mongoose.connection
   */

  // var connection = mongoose.createConnection(mongoUrl, {
  mongoose.connect(config.database.uri, { server: config.database.server })
    .then(() => {
      console.log('Connected to database')
      return mongoose.connection
    },
    err => {
      console.log('Connection error')
      alert('Error Promise ' + err)
    })

  // console.log(connection)
  // console.log(mongoose.connection)

  return mongoose.connection
}

function disconnect () {
  mongoose.disconnect()
  console.log('Connection closed!')
}

var connection = connect()

module.exports = {
  connect: connect,
  disconnect: disconnect,
  connection: connection
}
