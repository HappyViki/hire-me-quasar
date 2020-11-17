const { Client } = require('pg')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const port = process.env.PORT || 5000

const clientConfig = {
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/hireme',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
}

const app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.use(history())
app.use(serveStatic(path.join(__dirname, 'dist', 'spa')))

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'dist', 'spa')))

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)')
  server.close()
})

app.get('/add_message', (appReq, appRes) => {
  const client = new Client(clientConfig)

  client.connect()

  const name = typeof (appReq.query.name) === 'string' && appReq.query.name.trim().length > 0 ? appReq.query.name.trim() : ''
  const message = typeof (appReq.query.message) === 'string' && appReq.query.message.trim().length > 0 ? appReq.query.message.trim() : ''

  client.query(`INSERT INTO messages Values ('${name}', '${message}');`, (clientErr, clientRes) => {
    if (clientErr) throw clientErr

    appRes.send(JSON.stringify(clientRes.rows))
    client.end()
  })
})

const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}\nClick Ctrl-C to exit.`)
})
