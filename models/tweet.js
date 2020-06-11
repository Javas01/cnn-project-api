const mongoose = require('mongoose')

const Schema = mongoose.Schema
const TweetSchema = new Schema({
  user: String,
  body: String,
  date: String
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet
