const Question = require('../models/question')
const { ObjectId } = require('mongoose').Types


class QuestionController {
  static create(req, res) {
    let {title, content, author, userId} = req.body
    let newQuestion = {
      title,
      content,
      author,
      userId,
      voteUp: [],
      voteDown: [],
      viewers: [],
      answers: [],
      createdAt: new Date(),
      editedAt: new Date()
    }
    Question.create(newQuestion)
      .then(data => {
        res.status(201).json({ data })
      })
      .catch(err => {
        res.status(500).json({ message: err.message})
      })
  }

  static findAll(req, res) {
    Question
      .find()
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => {
        res.status(500).json({message : err.message})
      })
  }

  static findOne(req, res) {
    console.log(req.headers)
    Question
    .findOne(ObjectId(req.params.questionId))
    .then(data => {
      if (data.viewers.indexOf(req.headers.userid) === -1) {
        return Question.findByIdAndUpdate(ObjectId(req.params.questionId), {
          $push: {viewers: req.headers.userid}
        })
      }
      else {
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

  static put(req, res) {
    let {title, content} = req.body
    Question
      .findByIdAndUpdate(ObjectId(req.params.questionId),
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
    Question
      .findByIdAndUpdate(ObjectId(req.params.questionId), req.body
      )
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static delete(req, res) {
    Question
      .deleteOne({_id : ObjectId(req.params.questionId)})
      .then(data => {
        res.status(200).json({data})
      })
      .catch(err => {
        res.status(500).json({msg : err.message})
      })
  }

  static upVote(req, res) {
    Question
      .findOne(ObjectId(req.params.questionId))
      .then(data => {
        console.log(data)
        if (data.voteDown.indexOf(req.body.userId) !== -1) {
          return Question.findByIdAndUpdate(ObjectId(req.params.questionId), {
            $pull: {voteDown: req.body.userId}
          })       
        } 
        else if (data.voteUp.indexOf(req.body.userId) === -1) {
          return Question.findByIdAndUpdate(ObjectId(req.params.questionId), {
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
    Question
      .findOne(ObjectId(req.params.questionId))
      .then(data => {
        console.log(data)
        if (data.voteUp.indexOf(req.body.userId) !== -1) {
          return Question.findByIdAndUpdate(ObjectId(req.params.questionId), {
            $pull: {voteUp: req.body.userId}
          })
        }
        else if (data.voteDown.indexOf(req.body.userId) === -1) {
          return Question.findByIdAndUpdate(ObjectId(req.params.questionId), {
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

  static addViewer(req, res) {
    Question
    .findOne(ObjectId(req.params.questionId))
    .then(data => {
      if (data.viewers.indexOf(req.body.userId) === -1) {
        return Question.findByIdAndUpdate(ObjectId(req.params.questionId), {
          $push: {viewers: req.body.userId}
        })
      }
      else {
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

module.exports = QuestionController