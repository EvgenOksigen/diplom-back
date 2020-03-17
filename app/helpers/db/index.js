import {PSQL_URI} from '../../config'
import {Pool} from 'pg'
import connectionString from 'pg-connection-string'
var parse = connectionString.parse

const pool = new Pool(parse(PSQL_URI))

module.exports = {
  pool: pool,
  query: (text, params) => pool.query(text, params),
}