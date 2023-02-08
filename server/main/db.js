const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'telemedicine',
  password: 'Ninad@bits',
  post: 5432
})

module.exports = pool
