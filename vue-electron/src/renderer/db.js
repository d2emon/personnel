var mongoose = require('mongoose')
var moment = require('moment')

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
  tab_no: String,
  department: Department,
  job: Job,
  partnership_id: { type: Number, default: 1 },
  vacancies: { type: Number, default: 1.00 },
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

var PositionModel = mongoose.model('Position', Position)

var Person = new Schema({
  positions: [Position],
  first_name: String,
  second_name: String,
  last_name: String,
  address: Address,
  sex_id: Number,
  birthday: Date,
  document: Document,
  phone: String
})

Person.virtual('position').get(function () {
  if (this.positions.length <= 0) {
    return new PositionModel()
  }
  return this.positions[this.positions.length - 1]
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
module.exports.PositionModel = PositionModel
module.exports.PersonModel = mongoose.model('Person', Person)
module.exports.AddressModel = mongoose.model('Address', Address)
module.exports.DocumentModel = mongoose.model('Document', Document)
module.exports.RegistrationModel = mongoose.model('Registration', Registration)
