const {database, username, host, password} = require('./../utils/constants');

module.exports = {
  "development": {
    username,
    password,
    database,
    host,
    "dialect": "mysql"
  },
  "test": {
    username,
    password,
    database,
    host,
    "dialect": "mysql"
  },
  "production": {
    username,
    password,
    database,
    host,
    "dialect": "mysql"
  }
}
