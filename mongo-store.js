let db;

module.exports = {
  setDB(newDb) {
    db = newDb
  },

  getDB() {
    return db
  }
}
