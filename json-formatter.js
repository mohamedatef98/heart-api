module.exports = (res, { error, message, data, status }) => {
  res.setHeader('Content-Type', 'application/json')

  if (error || message) res.status(status || 500).send(JSON.stringify({ error: true, message: message || '' }))
  else res.status(status || 200).send(JSON.stringify({ error: false, message: '', data }))
}