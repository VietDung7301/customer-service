const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

require("dotenv").config();

server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(router)

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})
