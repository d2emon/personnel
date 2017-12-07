var mongoose = require('mongoose')
var moment = require('moment')

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

var Address = new Schema({
  city: String,
  district: String,
  region: String,
  country: String,
  fact: String
})

var Registration = new Schema({
  address: String,
  date_from: Date,
  date_to: Date
})

var Document = new Schema({
  // type
  series: String,
  document_no: String,
  given_by: String,
  given_at: Date,
  registration: Registration
})

var Position = new Schema({
  partnership_id: Number,
  tab_no: String,
  department: Department,
  job: Job,
  // Sovmeshenie
  vacancies: { type: Number, default: 0.00 },
  salary: { type: Number, default: 0.00 },
  // Schedule
  order_no: String,
  order_from: Date,
  work_from: Date,
  base: String,
  comment: String
})

Position.virtual('order').get(function () {
  let order = ''
  if (this.order_from) {
    order = 'от ' + moment(this.order_from).format('DD.MM.YYYY')
  }
  if (this.order_no) {
    return '№' + this.order_no + ' ' + order
  }
  return order
})

Position.virtual('order_from_text').get(function () {
  return moment(this.order_from).format('DD.MM.YYYY')
})

Position.virtual('work_from_text').get(function () {
  return moment(this.work_from).format('DD.MM.YYYY')
})

var Person = new Schema({
  position: Position,
  positions: [Position],
  first_name: String,
  second_name: String,
  last_name: String,
  address: Address,
  sex_id: [0, 1],
  birthday: Date,
  document: Document,
  phone: String
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
module.exports.PersonModel = mongoose.model('Person', Person)
module.exports.AddressModel = mongoose.model('Address', Address)
module.exports.DocumentModel = mongoose.model('Document', Document)
module.exports.RegistrationModel = mongoose.model('Registration', Registration)
module.exports.connection = db
module.exports.connect = connect
module.exports.disconnect = disconnect
