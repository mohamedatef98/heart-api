require('dotenv').config()

const MongoClient = require('mongodb').MongoClient

const mongoStore = require('./mongo-store')

const express = require('express')

const app = express()

const jsonFormatter = require('./json-formatter')

const error = require('./api-error')

MongoClient.connect(process.env.MONGO_URL, function (err, client) {
  if (err) return console.error('Can\'t connect to database', err)
  const db = client.db(process.env.DB_NAME);

  mongoStore.setDB(db)

  const Heart = require('./heart')
  
  app.get('/heart', (req, res) => {
    Heart.getList((err, docs) => {
      if (err) return jsonFormatter(res, { err })
      return jsonFormatter(res, { data: docs })
    })
  })

  app.post('/heart', (req, res) => {
    const obj = req.body
    Heart.create(obj, (err, doc) => {
      if (err) return jsonFormatter(res, { err })
      return jsonFormatter(res, { data: doc, message: 'Record Created' })
    })
  })

  app.get('/heart/:id', (req, res) => {
    const id = req.param('id')
    Heart.get(id, (err, doc) => {
      if (err) return jsonFormatter(res, { err })
      return jsonFormatter(res, { data: doc })
    })
  })

  app.get('/', (req, res) => jsonFormatter(res, { message: 'invalid route, only valid routes are get,post/heart get/heart/:_id', status: 404 }))
  
  const port = process.env.PORT || 3000
  app.listen(port, () => console.log('App is listening at ' + port))

})
