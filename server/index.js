const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const posts = require('./routes/api/post')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use('/api/routes', posts)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}
const port = process.env.PORT || 5005
app.listen(port, () => {
  console.log(`server start @ ${port}`)
})
