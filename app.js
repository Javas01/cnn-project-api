const axios = require('axios')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Tweet = require('./models/tweet')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://jawwaad:bfjYkI9h0oJOuuti@cnn-database-jmbns.mongodb.net/cnn-project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => { console.log('connected') })

const config = {
  headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
}

app.get('/feed', (req, res) => {
  (async () => {
    try {
      const response = await axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json\?screen_name\=cnn\&count\=4', config)
      await response.data.map(item => {
        Tweet.find({ body: item.text })
          .then((data) => {
            if (data[0] === undefined) {
              new Tweet({
                user: item.user.name,
                body: item.text,
                date: item.created_at
              }).save(err => {
                if (err) return console.error(err)
                console.log('tweet saved to database')
              })
            } else {}
          })
      })
      Tweet.find({ })
        .then(data => {
          console.log('Data:', data)
          res.json(data)
        })
        .catch(error => {
          console.log('Error:', error)
        })
    } catch (error) {
      console.log(error)
    }
  })()
  // res.header('Access-Control-Allow-Origin', '*')
})

app.listen(process.env.PORT || 3001)
