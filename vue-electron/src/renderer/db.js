var mongoose = require('mongoose')
// var log         = require('./log')(module);
var mongoUrl = 'mongodb://localhost:27017/personnel'

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
  mongoose.connect(mongoUrl, {
    server: {
      useMongoClient: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 5000
    }
  }).then(
    () => {
      console.log('Connected to database')
      // console.log(mongoose.connection)
      return mongoose.connection
    },
    err => {
      console.log('Connection error')
      alert('Error Promise ' + err)
    }
  )

  // console.log(connection)
  // console.log(mongoose.connection)

  return mongoose.connection
}

function disconnect () {
  mongoose.disconnect()
  console.log('Connection closed!')
}

var db = connect()

/**
 * db.on('open', function () {
 *   console.log('Trying to open')
 *   alert('Opened')
 * })
 */

var Schema = mongoose.Schema

// Schemas
var JobCategory = new Schema({
  title: { type: String, required: true, default: '' },
  comment: { type: String }
})

var Job = new Schema({
  job_code: { type: String, required: true },
  title: { type: String, required: true },
  category: JobCategory
})

var Vacancy = new Schema({
  job: Job,
  // department: Department,
  rank: String,
  wages: { type: Number, default: 0.00 },
  vacancy_total: { type: Number, default: 0.00 },
  vacancy_filled: { type: Number, default: 0.00 },
  salary_min: { type: Number, default: 0.00 },
  salary_max: { type: Number, default: 0.00 },
  comment: { type: String }
})

var Department = new Schema({
  title: { type: String, required: true },
  comment: { type: String },
  vacancies: [Vacancy]
})

var Position = new Schema({
  department: Department,
  job: Job,
  // Sovmeshenie
  vacancies: { type: Number, default: 0.00 },
  wages: { type: Number, default: 0.00 },
  // Schedule
  orderNo: String,
  orderFrom: Date,
  workFrom: Date,
  base: String
})

// validation
/**
 * Article.path('title').validate(function (v) {
 *   return v.length > 5 && v.length < 70;
 * });
 */

module.exports.JobCategoryModel = mongoose.model('JobCategory', JobCategory)
module.exports.JobModel = mongoose.model('Job', Job)
module.exports.VacancyModel = mongoose.model('Vacancy', Vacancy)
module.exports.DepartmentModel = mongoose.model('Department', Department)
module.exports.PositionModel = mongoose.model('Position', Position)
module.exports.connection = db
module.exports.connect = connect
module.exports.disconnect = disconnect
