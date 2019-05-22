const Answer = require('../models/answer')
const Question = require('../models/question')
const { ObjectId } = require('mongoose').Types


class AnswerController {
  static create(req, res) {
    let {content, questionId, author, userId} = req.body
    let newAnswer = {
      content,
      questionId: req.params.questionId,
      author,
      userId,
      voteUp: [],
      voteDown: [],
      verified: false,
      createdAt: new Date(),
      editedAt: new Date()
    }
    Answer.create(newAnswer)
      .then(data => {
        Question.findByIdAndUpdate(ObjectId(data.questionId), {
          $push: {answers: data._id}
        })
        .then(data => {
          console.log('data question', data)
        })
        console.log(data)
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ message: err.message})
      })
  }

  static findAll(req, res) {
    Answer
      .find({questionId: req.params.questionId})
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({message : err.message})
      })
  }

  static findOne(req, res) {
    Answer
      .findById(ObjectId(req.params.answerId))
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static put(req, res) {
    let {title, content} = req.body
    Answer
      .findByIdAndUpdate(ObjectId(req.params.id),
      {
        title,
        content
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }

  static patch(req, res) {
    Answer
      .findByIdAndUpdate(ObjectId(req.params.id), {
        [req.body.field] : req.body.value
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static delete(req, res) {
    Answer
      .deleteOne({_id : ObjectId(req.params.id)})
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static upVote(req, res) {
    Answer
      .findOne(ObjectId(req.params.answerId))
      .then(data => {
        console.log(data)
        if (data.voteDown.indexOf(req.body.userId) !== -1) {
          return Answer.findByIdAndUpdate(ObjectId(req.params.answerId), {
            $pull: {voteDown: req.body.userId}
          })       
        } 
        else if (data.voteUp.indexOf(req.body.userId) === -1) {
          return Answer.findByIdAndUpdate(ObjectId(req.params.answerId), {
            $push: {voteUp: req.body.userId}
          })       
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static downVote(req, res) {
    Answer
      .findOne(ObjectId(req.params.answerId))
      .then(data => {
        console.log(data)
        if (data.voteUp.indexOf(req.body.userId) !== -1) {
          return Answer.findByIdAndUpdate(ObjectId(req.params.answerId), {
            $pull: {voteUp: req.body.userId}
          })
        }
        else if (data.voteDown.indexOf(req.body.userId) === -1) {
          return Answer.findByIdAndUpdate(ObjectId(req.params.answerId), {
            $push: {voteDown: req.body.userId}
          })       
        } else {
          return data
        }
      })
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

}

module.exports = AnswerController