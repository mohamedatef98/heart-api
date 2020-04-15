require('dotenv').config()

const express = require('express')

const app = express()

const jsonFormatter = require('./json-formatter')

const Heart = require('./heart')

app.get('/heart', (req, res) => {
  return jsonFormatter(res, { data: Heart.all() })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('App is listening at ' + port))
