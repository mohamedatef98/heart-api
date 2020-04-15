class APIError {
  constructor(err, message, details, status) {
    this.err = err
    this.message = message
    this.details = details
    this.status = status
  }
}

module.exports = {
  error: (err, message, details, status) => new APIError(err, message, details, status)
}
