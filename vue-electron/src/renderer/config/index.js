module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/personnel',
    server: {
      useMongoClient: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 5000
    }
  }
}
