const axios = require('axios')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Tweet = require('./models/tweet')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => { console.log('connected') })

const config = {
  headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
}

app.get('/feed/:screenName', (req, res) => {
  (async () => {
    try {
      const response = await axios.get(`https://api.twitter.com/1.1/statuses/user_timeline.json\?screen_name\=${req.params.screenName}\&count\=100`, config)
      const savedData = response.data.map(async (item) => {
        const data = await Tweet.find({ text: item.text })
        if (data[0] === undefined) {
          new Tweet({
            screen_name: item.user.screen_name.toLowerCase(),
            name: item.user.name,
            text: item.text,
            created_at: item.created_at
          }).save(err => {
            if (err) return console.error(err)
          })
        }
      })
      await Promise.all(savedData)
      const data = await Tweet.find({ screen_name: req.params.screenName.toLowerCase() })
      res.json(data)
    } catch (error) {
      console.log(error)
    }
  })()
})

app.listen(process.env.PORT || 3001)
