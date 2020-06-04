const axios = require('axios');
const express = require ('express')
const cors = require ('cors')
const app = express()
require ('dotenv').config()

app.use(express.json())
app.use(cors())

const config = {
  headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
};

let feed

app.get('/feed', (req, res) => {
  (async () => {
    try {
      const response = await axios.get('https://api.twitter.com/1.1/statuses/user_timeline.json\?screen_name\=cnn\&count\=4', config)
      feed = await response.data
      console.log(feed)
      res.send(response.data)
    } catch (error) {
      console.log(error.response.body);
    }
  })();
  // res.header('Access-Control-Allow-Origin', '*')
})

app.listen(process.env.PORT || 3001)