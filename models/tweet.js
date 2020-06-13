const mongoose = require('mongoose')

const Schema = mongoose.Schema
const TweetSchema = new Schema({
  screen_name: String,
  name: String,
  text: String,
  created_at: String
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet
