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

mongoose.connect('mongodb://localhost/test1')
var db = mongoose.connection

db.on('error', function (err) {
  alert(['connection error:', err.message])
})

db.once('open', function callback () {
  console.log('Connected to DB!')
})

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

var Department = new Schema({
  title: { type: String, required: true },
  description: { type: String }
})

// validation
/**
 * Article.path('title').validate(function (v) {
 *   return v.length > 5 && v.length < 70;
 * });
 */

var DepartmentModel = mongoose.model('Department', Department)
module.exports.DepartmentModel = DepartmentModel
