const mongoose = require('mongoose')

let answerSchema = new mongoose.Schema({
  questionId: String,
  content: String,
  author: String,
  userId: String,
  verified: Boolean,
  voteUp: {
    type: [String]
  },
  voteDown: {
    type: [String]
  },
  createdAt: Date,
  updatedAt: Date
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer