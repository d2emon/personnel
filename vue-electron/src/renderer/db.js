// var fs = require('fs')
// var sql = require('sql.js')
// var bfr = fs.readFileSync('/tmp/db.sqlite')
// var db = new sql.Database(bfr)
// var db = new sql.Database()
/* db.each('SELECT * FROM test', function (row) {
  console.log(row)
}) */

var mongoose = require('mongoose')
// var log         = require('./log')(module);
var mongoUrl = 'mongodb://localhost:27017/personnel'

var db = null

function connect () {
  // mongoose.connect('mongodb://localhost/personnel')
  mongoose.connect(mongoUrl, function (err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connect, 5000)
    }
  })
  // mongoose.connect(uri, { server: { reconnectTries: Number.MAX_VALUE } })

  var db = mongoose.connection
  return db
}

function disconnect () {
  mongoose.disconnect()
  console.log('Connection closed!')
}

db = connect()

var Schema = mongoose.Schema

// Schemas
/**
 * var Images = new Schema({
 *   kind: {
 *     type: String,
 *     enum: ['thumbnail', 'detail'],
 *     required: true
 *   },
 *   url: { type: String, required: true }
 * });
 */

/**
 * var Article = new Schema({
 *   title: { type: String, required: true },
 *   author: { type: String, required: true },
 *   description: { type: String, required: true },
 *   images: [Images],
 *   modified: { type: Date, default: Date.now }
 * });
 */

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
module.exports.connection = db
module.exports.connect = connect
module.exports.disconnect = disconnect
