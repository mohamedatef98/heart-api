const { ObjectID } = require('mongodb')
const { isMongoId, isNumeric } = require('validator')
const moment = require('moment')
const mongoStore = require('./mongo-store')

const error = require('./api-error')

const db = mongoStore.getDB()
const collection = db.collection('heart')
module.exports = {
  getList(cb) {
    collection.find({ }).sort([['time', 1]]).toArray((err, res) => {
      if (err) return cb(error(err, 'Couldn\'t fetch records from database', '', 500))
      return cb(null, res)
    })
  },
  get(_id, cb) {
    if (!isMongoId(_id)) return cb(error({}, '_id should be a mongo id', '', 500))
    collection.findOne({ _id: ObjectID(_id) }, (err, res) => {
      if (err) return cb(error(err, 'Couldn\'t fetch this record from database', '', 500))
      return cb(null, res)
    })
  },
  create(obj, cb) {
    if (!isNumeric(String(obj.rate)) && !Number.isNaN(obj.rate)) return cb(error({}, 'rate should be a number', '', 500))

    if (!moment(obj.time).isValid()) return cb(error({}, 'time should be an ISO formatted date', '', 500))

    collection.insertOne({ rate: obj.rate, time: new Date(obj.time).toISOString() }, (err, res) => {
      if (err) return cb(error(err, 'Couldn\'t create this record', '', 500))
      return cb(null, res.ops[0])
    })
  }
}
