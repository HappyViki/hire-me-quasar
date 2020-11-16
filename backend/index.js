const { Client } = require('pg')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(express.json())

// For local developing
// app.use(function (req, res, next) {
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
// next()
// })

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, appRes) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  client.connect()

  const names = []

  client.query('SELECT name FROM messages;', (clientErr, clientRes) => {
    if (clientErr) throw clientErr
    let row
    for (row of clientRes.rows) {
      names.push(row.name)
    }

    appRes.send(JSON.stringify(clientRes.rows))
    client.end()
  })
})

app.get('/add_message', (appReq, appRes) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  client.connect()

  const name = typeof (appReq.query.name) === 'string' && appReq.query.name.trim().length > 0 ? appReq.query.name.trim() : ''
  const message = typeof (appReq.query.message) === 'string' && appReq.query.message.trim().length > 0 ? appReq.query.message.trim() : ''

  client.query(`INSERT INTO messages Values ('${name}', '${message}');`, (clientErr, clientRes) => {
    if (clientErr) throw clientErr

    appRes.send(JSON.stringify(clientRes.rows))
    client.end()
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
