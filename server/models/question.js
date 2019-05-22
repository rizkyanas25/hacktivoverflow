const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title Required']
  },
  content: {
    type: String,
    required: [true, 'Content Required']
  },
  author: {
    type: String
  },
  userId: {
    type: String
  },
  voteUp: {
    type: [String]
  },
  voteDown: {
    type: [String]
  },
  viewers: {
    type: [String]
  },
  answers: {
    type: [String]
  },
  createdAt: Date,
  updatedAt: Date
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question