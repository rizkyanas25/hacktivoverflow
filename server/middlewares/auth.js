const { verify } = require('../helpers/jwt');
const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');



module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      res.status(401).json({ error: 'You must login to access this endpoint' });
    } else {
      let decoded = verify(token);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           next();
         } else {
           res.status(401).json({ error: 'User is not valid' });
         }
       })
       .catch(err => { res.status(500).json(err) })
    }
  },
  authorizeQuestion: function(req, res, next) {
    Question.findOne({ _id: req.params.questionId })
      .then(question => {
        if(question.userId == localStorage.id) {
          next()
        } else {
          res.status(401).json({ error: 'Unauthorized' })
        }
      })
      .catch(err => { res.status(500).json(err) })
  },
  authorizeAnswer: function(req, res, next) {
    Answer.findOne({ _id: req.params.answerId })
      .then(answer => {
        if(answer.userId == localStorage.id) {
          next()
        } else {
          res.status(401).json({ error: 'Unauthorized' })
        }
      })
      .catch(err => { res.status(500).json(err) })
  },
}
