const axios = require('axios');
const express = require ('express')
const app = express()

app.use(express.json())

const config = {
  headers: { Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAAppEwEAAAAAlAQu9NZhqmMt7Pe3NwMSXiGsdXE%3DqUEiGSOjB57BLQi0Yn5fJKzVyqt4CwWb5pDWcN5DPN2KYd5Ko9' }
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
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
})

app.listen(3001)