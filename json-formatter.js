module.exports = (res, { err, message, data, status }) => {
  res.setHeader('Content-Type', 'application/json')

  if (err) res.status(err.status || status || 500).send(JSON.stringify({ 
      error: true,
      message: err.message || message || 'Internal Server error',
      details: err.err || ''
    }))

  else res.status(status || 200).send(JSON.stringify({ data: data || '', error: false, message: message || '' }))
}
